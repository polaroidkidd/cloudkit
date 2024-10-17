import type { Image } from '@cloudkit/ui-core';
import { generateId } from 'lucia';

import { IMAGE_API, IMAGE_API_TOKEN } from '$env/static/private';

import type { CloudflareImageDeleteResponse } from '@cloudkit/ui-core';
import { isDevOrCi } from '@cloudkit/ui-core';
import { db } from './prisma-client';

/**
 * Image paths consist of the following items in the following order
 *   1. userId
 *   2. roomId
 *   3. boxId
 *   4. imteId
 *
 */
export type ImageTypes = `${string}/${string}/${string}/${string}` | `${string}/avatar`;

/**
 * @interface ImageRepositoryCreate
 * @description Interface for the create method of the ImageRepository class.
 * @property {Prisma.ImageCreateInput} data - The data to create the image with.
 * @property {File} image - The image file to upload.
 * @property {ImageTypes} type - The type of the image.
 */

/**
 * @class ImageRepository
 * @description Class representing the image repository.
 */
class ImageRepository {
	static _instanceCache: ImageRepository;

	static instance(): ImageRepository {
		if (!this._instanceCache) {
			this._instanceCache = new this();
		}

		return this._instanceCache;
	}

	/**
	 * Finds an image by its ID.
	 * @param id - The ID of the image to find.
	 * @returns A Promise that resolves to the found image, or null if no image was found.
	 */
	findImageById(id: string): Promise<Image | null> {
		return db.image.findUniqueOrThrow({
			where: {
				id: id
			}
		});
	}

	/**
	 * @method create
	 * @description Creates a new image.
	 * @param {File} The file to upload
	 * @returns {Promise<string>} A Promise that resolves to the created image URL.
	 */
	async create(image: File): Promise<Image> {
		await this.postToImageService(image);
		const id = generateId(31);

		return db.image.create({ data: { id: id, url: `${IMAGE_API}/${id}` } });
	}

	async deleteFromCloudflare(url: string): Promise<CloudflareImageDeleteResponse> {
		return (await fetch(url, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${IMAGE_API_TOKEN}`
			}
		})) as unknown as CloudflareImageDeleteResponse;
	}

	/**
	 * @method deleteById
	 * @description Deletes an image by its ID.
	 * @param {string} url - The ID of the image to delete.
	 * @returns {Promise<Image>} A Promise that resolves to the deleted image.
	 */
	async deleteByUrl(url: string): Promise<Image> {
		const response = await fetch(url, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${IMAGE_API_TOKEN}`
			}
		});
		if (response.status === 200) {
			return await db.image.delete({ where: { url: url } });
		}
		return await db.image.findFirstOrThrow({ where: { url: url } });
	}

	/**
	 * @method findAll
	 * @description Finds all images.
	 * @returns {Promise<Image[]>} A Promise that resolves to an array of all images.
	 */
	findAll(): Promise<Image[]> {
		return db.image.findMany();
	}

	/**
	 * @method findById
	 * @description Finds an image by its ID.
	 * @param {string} id - The ID of the image to find.
	 * @returns {Promise<Image>} A Promise that resolves to the found image.
	 */
	findById(id: string): Promise<Image> {
		return db.image.findUniqueOrThrow({ where: { id } });
	}

	/**
	 * @method update
	 * @description Updates an image.
	 * @param {NonNullable<Prisma.ImageUpdateInput>} data - The data to update the image with.
	 * @returns {Promise<Image>} A Promise that resolves to the updated image.
	 */
	async update({ data, image }: { data: Image; image: File }): Promise<Image> {
		await this.patchToImageService(image, data.id);

		if (!data.avatar) {
			throw new Error('No avatar found in user');
		}
		return await db.image.update({
			where: { id: data.id },
			data: { updatedAt: new Date(), url: data.avatar.url }
		});
	}

	async postToImageService(image: File): Promise<{ url: string; id: string }> {
		const id = generateId(31);

		if (isDevOrCi) {
			await fetch(`${IMAGE_API}/${id}`, {
				method: 'PUT',
				headers: {
					'Content-prefix': 'image/webp',
					Slug: `${`${IMAGE_API}/${id}`}.webp`
				},
				body: image
			});

			return { url: `${IMAGE_API}/${id}`, id: id };
		} else {
			const form = new FormData();

			form.append('file', new Blob([image]));
			form.append('id', id);
			const workerResponse = await fetch(IMAGE_API, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${IMAGE_API_TOKEN}`
				},
				body: form
			});
			const resppnse = await workerResponse.json();

			return { url: `${IMAGE_API}/${resppnse.result.id}`, id: resppnse.result.id };
		}
	}

	async patchToImageService(image: File, id: string): Promise<string> {
		if (isDevOrCi) {
			await fetch(`${IMAGE_API}/${id}`, {
				method: 'PUT',
				headers: {
					'Content-prefix': 'image/webp',
					Slug: `${IMAGE_API}/${id}.webp`
				},
				body: image
			});
			await db.image.update({
				where: {
					id
				},
				data: {
					updatedAt: new Date()
				}
			});
			return id as string;
		} else {
			// Delete the old image first
			const oldImage = await db.image.findFirstOrThrow({ where: { id } });
			await this.deleteFromCloudflare(oldImage.url);
			// Upload the new image to the same URL
			const form = new FormData();

			form.append('file', new Blob([image]));
			form.append('id', id);
			const workerResponse = await fetch(IMAGE_API, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${IMAGE_API_TOKEN}`
				},
				body: form
			});
			const resppnse = await workerResponse.json();
			await db.image.update({
				where: {
					id
				},
				data: {
					updatedAt: new Date()
				}
			});
			return resppnse.result.id;
		}
	}

	/**
	 * Deletes an image by its ID.
	 * @param id - The ID of the image to delete.
	 * @returns A promise that resolves when the image is deleted.
	 */
	async deleteById(id: string) {
		const image = await this.findById(id);
		await this.deleteByUrl(image.url);
		return await db.image.delete({ where: { id } });
	}

	async findByUserId(userId: string): Promise<Image | null> {
		return db.image.findFirst({
			where: {
				user: {
					id: userId
				}
			}
		});
	}
}

const repo = Object.freeze(new ImageRepository());
export { repo as ImageRepository };
