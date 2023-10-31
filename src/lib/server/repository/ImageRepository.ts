import { IMAGE_API, IMAGE_API_TOKEN } from '$env/static/private';
import type { Image } from '@lib/utils/RepositoryMethods';
import { isDev } from '@lib/utils/general';
import { v4 as uuid } from 'uuid';
import { db } from './prismaClient';

/**
 * A repository for handling image uploads, retrieval, and deletion.
 */
class ImageRepository {
	static _instanceCache: ImageRepository;

	static instance() {
		if (!this._instanceCache) {
			this._instanceCache = new this();
		}

		return this._instanceCache;
	}

	/**
	 * Uploads an image to the server and returns the image URL.
	 * @param image - The image file to upload.
	 * @param type - The type of the image.
	 * @returns A Promise that resolves to the image URL.
	 * @throws An error if the path starts or ends with a slash.
	 */
	async handleImageUpload(image: File, type: string) {
		if (type.startsWith('/')) {
			throw new Error('Path cannot start with /');
		}
		if (type.endsWith('/')) {
			throw new Error('Path cannot end with /');
		}
		const id = uuid();

		const path = `${type}/${id}`;

		if (isDev) {
			// Upload to local thumbor instance
			await fetch(`${IMAGE_API}/${path}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'image/webp',
					Slug: `${id}`
				},
				body: image
			});
		} else {
			// Upload to Cloudflare Image Service
			const form = new FormData();
			form.append('file', new Blob([image]), id);
			form.append('id', path);
			await fetch(IMAGE_API, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${IMAGE_API_TOKEN}`
				},
				body: form
			});
		}
		return db.image.create({
			data: {
				id: id,
				createdAt: new Date(),
				url: path
			}
		});
	}

	/**
	 * Finds an image by its ID.
	 * @param id - The ID of the image to find.
	 * @returns A Promise that resolves to the image object, or null if not found.
	 */
	findImageById(id: string) {
		return db.image.findUnique({
			where: {
				id: id
			}
		});
	}

	/**
	 * Deletes an image from the database and the CDN by its ID.
	 * @param id - The ID of the image to delete.
	 * @returns A Promise that resolves when the image has been deleted from the database.
	 */
	async deleteById(id: string) {
		const image = await db.image.findUniqueOrThrow({ where: { id: id } });
		await this.deleteFromCDN(image);
		return db.image.delete({
			where: {
				id: id
			}
		});
	}

	/**
	 * We can include the bearer token here since in the dev environment
	 * it'll be ignored and in prod it will be consumed by
	 * the Cloudflare Image API
	 * @param id The id of the image to delete
	 */
	async deleteFromCDN(image: NonNullable<Image>) {
		await fetch(`${IMAGE_API}/${image.url}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${IMAGE_API_TOKEN}` }
		});
	}
}

const repo = Object.freeze(new ImageRepository());
export { repo as ImageRepository };
