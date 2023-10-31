import fetch from 'node-fetch';
import sharp from 'sharp';
import { v4 as uuid } from 'uuid';
const dev = process.env.SEED_DEV === 'true';

export async function createImage(type) {
	const image = await fetch('https://picsum.photos/736/736.webp')
		.then((response) => response.arrayBuffer())
		.then((buffer) => sharp(buffer).webp({ quality: 80 }).toBuffer());

	return dev
		? await postToLocalThumborInstance(image, type)
		: await postToCloudflareImageService(image, type);
}
async function postToCloudflareImageService(image, type) {
	const id = uuid();
	const path = `${type}/${id}`;

	const form = new FormData();
	form.append('file', new Blob([image]), id);
	form.append('id', path);
	await fetch(process.env.IMAGE_API, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${process.env.IMAGE_API_TOKEN}`
		},
		body: form
	});
	return { path, id };
}

async function postToLocalThumborInstance(image, type) {
	const id = uuid();

	const path = `${type}/${id}`;

	await fetch(`${process.env.IMAGE_API}/${path}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'image/webp',
			Slug: `${id}.webp`
		},
		body: image
	});

	return { path, id };
}

export const userAttributes = (data) => ({
	firstName: data.firstName,
	lastName: data.lastName,
	email: data.email,
	bio: data.bio,
	avatar: data.avatar,
	createdAt: data.createdAt,
	updatedAt: data.updatedAt,
	verified: data.verified
});
