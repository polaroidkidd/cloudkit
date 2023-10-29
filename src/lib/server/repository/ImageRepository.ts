import { CLOUDFLARE_IMAGE_API } from '$env/static/private';
import { v4 as uuid } from 'uuid';
import { db } from './prismaClient';
class ImageRepository {
	static _instanceCache: ImageRepository;

	static instance() {
		if (!this._instanceCache) {
			this._instanceCache = new this();
		}

		return this._instanceCache;
	}

	async handleImageUpload(image: File, type: string) {
		if (type.startsWith('/')) {
			throw new Error('Path cannot start with /');
		}
		if (type.endsWith('/')) {
			throw new Error('Path cannot end with /');
		}
		const id = uuid();

		const path = `${type}/${id}`;
		await fetch(`${CLOUDFLARE_IMAGE_API}/${path}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'image/webp',
				Slug: `${id}`
			},
			body: image
		});
		return db.image.create({
			data: {
				id: id,
				createdAt: new Date(),
				url: path
			}
		});
	}
	findImageById(id: string) {
		return db.image.findUnique({
			where: {
				id: id
			}
		});
	}

	async deleteById(id: string) {
		this.deleteFromCDN(id);
		return db.image.delete({
			where: {
				id: id
			}
		});
	}

	deleteFromCDN(id: string) {
		fetch(`${CLOUDFLARE_IMAGE_API}/${id}`, {
			method: 'DELETE'
		});
	}
}

const repo = Object.freeze(new ImageRepository());
export { repo as ImageRepository };
