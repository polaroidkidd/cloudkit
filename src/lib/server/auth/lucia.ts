import { prisma } from '@lucia-auth/adapter-prisma';
import { lucia, type Session } from 'lucia';

import { db } from '@lib/server/repository/prismaClient';
import { error, redirect } from '@sveltejs/kit';
import { sveltekit } from 'lucia/middleware';

import { dev } from '$app/environment';
import { IS_CI, REDIS_TOKEN, REDIS_URL } from '$env/static/private';
import { upstash } from '@lucia-auth/adapter-session-redis';

// PROD
import { Redis as prodRedisClient } from '@upstash/redis/cloudflare';

// DEV or CI
// import { createClient as devRedisClient } from 'redis';
function createSessionConfiguration() {
	if (dev || IS_CI === 'true') {
		// const redisClient = devRedisClient({
		// url: REDIS_URL
		// });
		//
		// redisClient.connect();
		// redisClient.on('error', (err) => console.log('Redis Client Error', err));
		// redisClient.on('ready', () => console.log('Redis Client Ready'));
		// return redis(redisClient);
	}
	return upstash(
		new prodRedisClient({
			url: REDIS_URL,
			token: REDIS_TOKEN
		})
	);
}

export const auth = lucia({
	adapter: {
		user: prisma(db),
		session: createSessionConfiguration()
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

export type Auth = typeof auth;

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
