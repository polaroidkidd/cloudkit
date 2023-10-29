import { PrismaClient } from '@prisma/client';
import { lucia } from 'lucia';
import { prisma } from '@lucia-auth/adapter-prisma';
import { v4 as uuid } from 'uuid';
import fetch from 'node-fetch';
import { faker } from '@faker-js/faker';
import sharp from 'sharp';

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

async function createImageInService(type) {
	const id = uuid();
	const image = await fetch('https://picsum.photos/736')
		.then((response) => response.arrayBuffer())
		.then((buffer) => sharp(buffer).webp({ quality: 80 }).toBuffer());

	const path = `${type}/${id}`;

	const form = new FormData();
	form.append('file', new Blob([image]), id);
	form.append('id', path);

	await fetch(process.env.CLOUDFLARE_IMAGE_API, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${process.env.CLOUDFLARE_IMAGE_API_TOKEN}`
		},
		body: form
	});
	// await fetch(`${process.env.THUMBOR_UPLOAD_URL}/${path}`, {
	// 	method: 'PUT',
	// 	headers: {
	// 		'Content-Type': 'image/webp',
	// 		Slug: `${id}.webp`
	// 	},
	// 	body: image
	// });

	return { path, id };
}

async function freshInit() {
	await db.user.deleteMany({});
	await db.image.deleteMany({});

	const { path, id } = await createImageInService('avatars');
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

	// Create 10 users
	for (let i = 0; i < 10; i++) {
		const { path, id } = await createImageInService('avatars');
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
