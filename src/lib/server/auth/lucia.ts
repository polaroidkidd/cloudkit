import { prisma } from '@lucia-auth/adapter-prisma';
import { lucia, type Session } from 'lucia';

import { db } from '@lib/server/repository/prismaClient';
import { error, redirect } from '@sveltejs/kit';
import { sveltekit } from 'lucia/middleware';

import { dev } from '$app/environment';
import { IS_CI, REDIS_TOKEN, REDIS_URL } from '$env/static/private';
import { redis as devRedis, upstash as prodRedis } from '@lucia-auth/adapter-session-redis';
import type { Auth as LuciaAuth, Configuration } from 'lucia';

type ProdAuth = LuciaAuth<
	Configuration & {
		adapter: {
			user: ReturnType<typeof prisma>;
			session: ReturnType<typeof prodRedis>;
		};
		env: 'DEV' | 'PROD';
		middleware: ReturnType<typeof sveltekit>;
		getUserAttributes: (data: unknown) => {
			firstName: string;
			lastName: string;
			email: string;
			bio: string;
			avatarId: string;
			createdAt: Date;
			updatedAt: Date;
			verified: boolean;
		};
	}
>;

type DevAuth = LuciaAuth<
	Configuration & {
		adapter: {
			user: ReturnType<typeof prisma>;
			session: ReturnType<typeof devRedis>;
		};
		env: 'DEV' | 'PROD';
		middleware: ReturnType<typeof sveltekit>;
		getUserAttributes: (data: unknown) => {
			firstName: string;
			lastName: string;
			email: string;
			bio: string;
			avatarId: string;
			createdAt: Date;
			updatedAt: Date;
			verified: boolean;
		};
	}
>;
export const eventualAuth: Promise<ProdAuth | DevAuth> = new Promise((resolve) => {
	if (dev || IS_CI === 'true') {
		import('redis').then(({ createClient }) => {
			const redisClient = createClient({
				url: REDIS_URL
			});

			redisClient.connect();
			redisClient.on('error', (err) => console.log('Redis Client Error', err));
			redisClient.on('ready', () => console.log('Redis Client Ready'));

			const auth = lucia({
				adapter: {
					user: prisma(db),
					session: devRedis(redisClient)
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
			resolve(auth as DevAuth);
		});
	} else {
		import('@upstash/redis/cloudflare').then((Redis) => {
			const auth = lucia({
				adapter: {
					user: prisma(db),
					session: prodRedis(
						new Redis.Redis({
							url: REDIS_URL,
							token: REDIS_TOKEN
						})
					)
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
			resolve(auth as ProdAuth);
		});
	}
});

export const auth = await eventualAuth;

export type AuthType = Awaited<typeof auth>;

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
