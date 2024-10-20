import fetch from 'node-fetch';
import sharp from 'sharp';
import { v4 as uuid } from 'uuid';

export async function createImage(type) {
	const image = await fetch('https://picsum.photos/700/700.webp')
		.then((response) => response.arrayBuffer())
		.then((buffer) => sharp(buffer).webp({ quality: 80 }).toBuffer());

	return postToCloudflareImageService(image, type);
}
async function postToCloudflareImageService(image, type) {
	const id = uuid();
	const path = `${type}/${id}`;

	const form = new FormData();
	form.append('file', new Blob([image]), id);
	form.append('id', path);

	const response = await fetch(process.env.IMAGE_API, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${process.env.IMAGE_API_TOKEN}`
		},
		body: form
	});

	const data = await response.json();
	return data;
}

const rep1 = await createImage('cloudkit/homepage');
const rep2 = await createImage('cloudkit/homepage');
const rep3 = await createImage('cloudkit/homepage');
const rep4 = await createImage('cloudkit/homepage');
console.info('rep1: ', rep1);
console.info('rep2: ', rep2);
console.info('rep3: ', rep3);
console.info('rep4: ', rep4);
