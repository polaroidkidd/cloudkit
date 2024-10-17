import fetch from 'node-fetch';
import sharp from 'sharp';
const dev = process.env.SEED_DEV === 'true';
import fs from 'fs';
export async function createImage(url) {
	const image = await fetch('https://picsum.photos/700')
		.then((response) => response.arrayBuffer())
		.then((buffer) => sharp(buffer).webp({ quality: 80 }).toBuffer());

	return dev
		? await postToLocalThumborInstance(image, url)
		: await postToCloudflareImageService(image, url);
}
async function postToCloudflareImageService(image, url) {
	const form = new FormData();
	form.append('file', new Blob([image]), url);
	form.append('id', url);
	const response = await fetch(process.env.IMAGE_API, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${process.env.IMAGE_API_TOKEN}`
		},
		body: form
	});

	console.info('response: ', response);
}

async function postToLocalThumborInstance(image, url) {
	await fetch(url, {
		method: 'PUT',
		headers: {
			'Content-prefix': 'image/webp',
			Slug: `${url}.webp`
		},
		body: image
	});
}

export const userAttributes = (data) => ({
	firstName: data.firstName,
	lastName: data.lastName,
	email: data.email,
	avatar: data.avatar,
	createdAt: data.createdAt,
	updatedAt: data.updatedAt,
	verified: data.verified,
	collections: data.collections
});
