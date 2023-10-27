import { ImageRepository } from './ImageRepository';
import { db } from './prismaClient';

class UserRepository {
	static _instanceCache: UserRepository;

	static instance() {
		if (!this._instanceCache) {
			this._instanceCache = new this();
		}

		return this._instanceCache;
	}

	findUserById(userId: string) {
		return db.user.findUniqueOrThrow({
			where: {
				id: userId
			},

			include: {
				avatar: {
					select: {
						url: true
					}
				}
			}
		});
	}

	async deleteById(userId: string) {
		const user = await db.user.findUnique({
			where: {
				id: userId
			},
			include: {
				avatar: true
			}
		});

		ImageRepository.deleteFromCDN(user?.avatar.url as string);
		return db.user.delete({
			where: {
				id: userId
			}
		});
	}
	async findAll() {
		return db.user.findMany({
			include: {
				avatar: true
			}
		});
	}
}

const repo = Object.freeze(new UserRepository());
export { repo as UserRepository };
