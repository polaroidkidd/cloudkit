import { ImageRepository } from './ImageRepository';
import { db } from './prismaClient';

class UserRepository {
	/**
	 * Singleton instance of UserRepository.
	 */
	static _instanceCache: UserRepository;

	/**
	 * Returns the singleton instance of UserRepository.
	 */
	static instance(): UserRepository {
		if (!this._instanceCache) {
			this._instanceCache = new this();
		}

		return this._instanceCache;
	}

	/**
	 * Finds a user by their ID.
	 * @param userId - The ID of the user to find.
	 * @returns The user with the specified ID.
	 * @throws An error if the user is not found.
	 */
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

	/**
	 * Deletes a user by their ID.
	 * @param userId - The ID of the user to delete.
	 * @returns A promise that resolves when the user is deleted.
	 */
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

	/**
	 * Finds all users.
	 * @returns An array of all users.
	 */
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
