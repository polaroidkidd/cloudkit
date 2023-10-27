import { PrismaClient } from '@prisma/client';
import { lucia } from 'lucia';
import { prisma } from '@lucia-auth/adapter-prisma';
import { v4 as uuid } from 'uuid';
import fetch from 'node-fetch';
import { faker } from '@faker-js/faker';
import sharp from 'sharp';
import { BlobServiceClient } from '@azure/storage-blob';

console.info('process.env.DATABASE_URL: ', process.env.DATABASE_URL);
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

	getUserAttributes: (data) => {
		return {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			bio: data.bio,
			avatar: data.avatar,
			createdAt: data.createdAt,
			updatedAt: data.updatedAt,
			verified: data.verified
		};
	}
});

async function createImageSet(type) {
	const id = uuid();
	const imgXL = await fetch('https://picsum.photos/736')
		.then((response) => response.arrayBuffer())
		.then((buffer) => sharp(buffer).webp({ quality: 80 }).toBuffer());

	const path = `${type}/${id}.webp`;
	await fetch(`${process.env.THUMBOR_URL}/${path}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'image/webp',
			Slug: `${id}.webp`
		},
		body: imgXL
	});

	return { path: `${process.env.THUMBOR_URL}/${type}/${id}`, id: id };
}

async function freshInit() {
	await db.user.deleteMany({});
	await db.image.deleteMany({});

	const { path, id } = await createImageSet('avatars');
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
			providerUserId: 'admin@test.com',
			password: 'adminadmin'
		},
		attributes: {
			email: 'admin@test.com',
			firstName: 'Svelte',
			lastName: 'Kit',
			bio: "I'm a full-stack web developer.",
			avatarId: image.id,
			createdAt: new Date(),
			updatedAt: new Date(),
			id: uuid(),
			verified: false
		}
	});

	// Create 100 users
	for (let i = 0; i < 100; i++) {
		const { path, id } = await createImageSet('avatars');
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
				password: 'admin'
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
