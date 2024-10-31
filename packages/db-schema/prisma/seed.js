import { faker } from '@faker-js/faker';
import { prisma } from '@lucia-auth/adapter-prisma';
import { PrismaClient } from '@prisma/client';
import { Lucia } from 'lucia';
import { createImage, userAttributes } from './seedUtils.js';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';

const db = new PrismaClient({
	datasources: {
		db: {
			url: process.env.DATABASE_URL
		}
	}
});

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
			verified: attributes.verified
		};
	}
});
const prefix = 'cloudkit';

async function freshInit() {
	await db.user.deleteMany({});
	await db.group.deleteMany({});
	await db.item.deleteMany({});
	await db.image.deleteMany({});
	// CREATE ADMIN USER

	const user = await auth.createUser({
		key: {
			providerId: 'username',
			providerUserId: 'admin@dle.dev',
			password: 'adminadmin'
		},
		attributes: {
			email: 'admin@dle.dev'
		}
	});
	const url = `${process.env.IMAGE_API}/${prefix}/${user.userId}/avatar`;
	await db.user.update({
		where: {
			id: user.userId,
			email: user.email
		},
		data: {
			firstName: 'Daniel',
			lastName: 'Kit',
			verified: false,
			avatar: {
				create: {
					url,
					id: user.userId
				}
			}
		}
	});
	await createImage(url);

	// CREATE RANDOM USERS
	for (let i = 0; i < 10; i++) {
		const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();
		const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@dle.dev`;
		const user = await auth.createUser({
			key: {
				providerId: 'username',
				providerUserId: email,
				password: 'adminadmin'
			},
			attributes: {
				email
			}
		});
		const url = `${process.env.IMAGE_API}/${prefix}/${user.userId}/avatar`;
		await db.user.update({
			where: {
				id: user.userId,
				email: user.email
			},
			data: {
				email,
				firstName,
				lastName,
				verified: false,
				avatar: {
					create: {
						url,
						id: user.userId
					}
				}
			}
		});

		await createImage(url);
	}
}

async function main() {
	await freshInit();
}
main()
	.then(async () => {
		await db.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await db.$disconnect();
		process.exit(1);
	});
