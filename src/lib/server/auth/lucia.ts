import { prisma } from '@lucia-auth/adapter-prisma';
import { lucia, type Session } from 'lucia';

import { db } from '@lib/server/repository/prismaClient';
import { error, redirect } from '@sveltejs/kit';
import { sveltekit } from 'lucia/middleware';

import { dev } from '$app/environment';
import { REDIS_URL } from '$env/static/private';
import { unstorage } from '@lucia-auth/adapter-session-unstorage';
import { createStorage } from 'unstorage';
import createUnstorageDriver from 'unstorage/drivers/cloudflare-kv-binding';
import { env } from '$env/dynamic/private';
/**
 * Returns a Lucia instance with the appropriate adapter and middleware based on the environment.
 * If the environment is development, it uses a Redis session adapter with a local Redis instance.
 * If the environment is production, it uses a Redis session adapter with an Upstash Redis instance.
 */
async function getConfiguration() {
	const sessionAdapter = await import('@lucia-auth/adapter-session-redis');
	const Redis = await import('redis');
	console.debug('Using dev redis');
	const redisClient = Redis.createClient({
		url: REDIS_URL
	});

	redisClient.connect();
	redisClient.on('error', (err) => console.log('Redis Client Error', err));
	redisClient.on('ready', () => console.log('Redis Client Ready'));

	return lucia({
		adapter: {
			user: prisma(db),
			session: sessionAdapter.redis(redisClient)
		},
		env: dev ? 'DEV' : 'PROD',
		middleware: sveltekit(),
		getUserAttributes: (data) => {
			return {
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				bio: data.bio,
				avatarId: data.avatarId,
				createdAt: data.createdAt,
				updatedAt: data.updatedAt,
				verified: data.verified
			};
		}
	});
}
const storage = createStorage({ driver: createUnstorageDriver({ binding: env.CLOUDKIT_KV }) });
/**
 * The instance of Lucia authentication middleware.
 */
export const auth = dev
	? await getConfiguration()
	: lucia({
			adapter: {
				user: prisma(db),
				session: unstorage(storage)
			},
			env: dev ? 'DEV' : 'PROD',
			middleware: sveltekit(),
			getUserAttributes: (data) => {
				return {
					firstName: data.firstName,
					lastName: data.lastName,
					email: data.email,
					bio: data.bio,
					avatarId: data.avatarId,
					createdAt: data.createdAt,
					updatedAt: data.updatedAt,
					verified: data.verified
				};
			}
	  });

export type AuthType = typeof auth;

/**
 *
 * @param {App.Locals} locals
 * @returns User Session
 * @throws Unauthorized if user session is expired or doesn't exist
 */
export async function getUserSession(
	locals: App.Locals,
	shouldRedirect = true
): Promise<Session['user']> {
	const session = await locals.auth.validate();
	if (!session) {
		if (shouldRedirect) {
			throw redirect(302, '/');
		} else {
			throw error(401);
		}
	}

	return session.user;
}
