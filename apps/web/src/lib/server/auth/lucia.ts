import { db } from '@lib/server/repository/prisma-client';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { Lucia } from 'lucia';

/**
 * Returns a Lucia instance with the appropriate adapter and middleware based on the environment.
 * If the environment is development, it uses a Redis session adapter with a local Redis instance.
 * If the environment is production, it uses a Redis session adapter with an Upstash Redis instance.
 */
async function getConfiguration() {
	const adapter = new PrismaAdapter(db.session, db.user);
	const lucia = new Lucia(adapter, {
		sessionCookie: {
			attributes: {
				// set to `true` when using HTTPS
				secure: process.env.NODE_ENV === 'production'
			}
		},

		getUserAttributes: (attributes) => {
			return {
				firstName: attributes.firstName,
				lastName: attributes.lastName,
				email: attributes.email,
				createdAt: attributes.createdAt,
				updatedAt: attributes.updatedAt,
				verified: attributes.verified,
				firstTime: attributes.firstTime
			};
		}
	});
	return lucia;
}

/**
 * The instance of Lucia authentication middleware.
 */
export const auth = await getConfiguration();
declare module 'lucia' {
	interface Register {
		Lucia: typeof auth;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

type DatabaseUserAttributes = {
	firstName: string;
	lastName: string;
	email: string;
	verified: boolean;
	createdAt: Date;
	updatedAt: Date;
	firstTime: boolean;
};
