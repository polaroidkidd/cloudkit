import { prisma } from '@lucia-auth/adapter-prisma';
import { lucia, type Session } from 'lucia';

import { db } from '@lib/server/repository/prismaClient';
import { error, redirect } from '@sveltejs/kit';
import { sveltekit } from 'lucia/middleware';

import { REDIS_TOKEN, REDIS_URL } from '$env/static/private';
import { isDev } from '@lib/utils/general';

/**
 * Returns a Lucia instance with the appropriate adapter and middleware based on the environment.
 * If the environment is development, it uses a Redis session adapter with a local Redis instance.
 * If the environment is production, it uses a Redis session adapter with an Upstash Redis instance.
 */
async function getConfiguration() {
	if (isDev) {
		const sessionAdapter = await import('@lucia-auth/adapter-session-redis');
		const Redis = await import('redis');
		console.info('Using dev redis');
		const redisClient = Redis.createClient({
			url: REDIS_URL
		});

		redisClient.connect();
		redisClient.on('error', (err) => console.error('Redis Client Error', err));
		redisClient.on('ready', () => console.info('Redis Client Ready'));

		return lucia({
			adapter: {
				user: prisma(db),
				session: sessionAdapter.redis(redisClient)
			},
			env: isDev ? 'DEV' : 'PROD',
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
	} else {
		const sessionAdapter = await import('@lucia-auth/adapter-session-redis');
		const Redis = await import('@upstash/redis/cloudflare');
		console.info('Using prod redis');
		return lucia({
			adapter: {
				user: prisma(db),
				session: sessionAdapter.upstash(
					new Redis.Redis({
						url: REDIS_URL,
						token: REDIS_TOKEN
					})
				)
			},
			env: isDev ? 'DEV' : 'PROD',
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
}

/**
 * The instance of Lucia authentication middleware.
 */
export const auth = await getConfiguration();

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
