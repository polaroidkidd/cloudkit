import { faker } from '@faker-js/faker';
import { prisma } from '@lucia-auth/adapter-prisma';
import { PrismaClient } from '@prisma/client';
import { lucia } from 'lucia';
import { v4 as uuid } from 'uuid';
import { createImage, userAttributes } from './seedUtils.js';

const db = new PrismaClient({
	datasources: {
		db: {
			url: process.env.DATABASE_URL
		}
	}
});

const auth = lucia({
	adapter: prisma(db),

	env: 'DEV',

	getUserAttributes: (data) => userAttributes(data)
});

async function freshInit() {
	await db.user.deleteMany({});wis
	await db.image.deleteMany({});

	// CREATE ADMIN USER
	const { path, id } = await createImage('cloudkit/users/avatars');
	const image = await db.image.create({
		data: {
			id: id,
			createdAt: new Date(),
			url: path
		}
	});
	await auth.createUser({
		key: {
			providerId: 'username',
			providerUserId: 'admin@dle.dev',
			password: 'admin@dle.dev'
		},
		attributes: {
			email: 'admin@dle.dev',
			firstName: 'Daniel',
			lastName: 'Kit',
			bio: "I'm a full-stack web developer.",
			avatarId: image.id,
			createdAt: new Date(),
			updatedAt: new Date(),
			id: uuid(),
			verified: false
		}
	});

	// CREATE RANDOM USERS
	for (let i = 0; i < 10; i++) {
		const { path, id } = await createImage('cloudkit/users/avatars');
		const image = await db.image.create({
			data: {
				id: id,
				createdAt: new Date(),
				url: path
			}
		});
		const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();
		const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@dle.dev`;
		await auth.createUser({
			key: {
				providerId: 'username',
				providerUserId: email,
				password: 'adminadmin'
			},
			attributes: {
				email: email,
				firstName: firstName,
				lastName: lastName,
				bio: faker.person.bio(),
				avatarId: image.id,
				createdAt: new Date(),
				updatedAt: new Date(),
				id: uuid(),
				verified: false
			}
		});
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
