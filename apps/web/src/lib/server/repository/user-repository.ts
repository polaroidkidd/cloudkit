import { isDevOrCi } from '@cloudkit/ui-core';
import { generateId } from 'lucia';

import type { Image, User, UserApiPost, UserWithRelations } from '@cloudkit/ui-core';
import { Prisma } from '@prisma/client';
import { ImageRepository } from './image-repository';
import { db } from './prisma-client';

const findUerByIdSchema = Prisma.validator<Prisma.UserDefaultArgs>()({
	include: {
		avatar: {
			select: {
				url: true,
				createdAt: true,
				updatedAt: true
			}
		}
	}
});

type FindUserByIdSchema = Prisma.UserGetPayload<typeof findUerByIdSchema>;

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
	findById(userId: string): Promise<FindUserByIdSchema> {
		return db.user.findUniqueOrThrow({
			where: {
				id: userId
			},
			include: {
				avatar: {
					select: {
						url: true,
						createdAt: true,
						updatedAt: true
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
		const deletedUser = await db.user.delete({
			where: {
				id: userId
			},
			include: {
				avatar: true
			}
		});

		if (deletedUser?.avatar && !isDevOrCi) {
			await ImageRepository.deleteFromCloudflare(deletedUser.avatar.url);
		}
		return true;
	}

	async create(data: UserApiPost & { avatar: File }): Promise<User> {
		const id = generateId(31);
		if (!data.avatar) {
			throw new Error('No avatar found in user');
		}
		const { id: imageId, url } = await ImageRepository.postToImageService(
			data.avatar as unknown as File
		);

		return db.user.create({
			data: {
				id: id,
				hashedPassword: data.hashedPassword,
				email: data.email,
				firstName: data.firstName,
				lastName: data.lastName,
				verified: false,
				firstTime: true,
				avatar: {
					create: { id: imageId, url: url }
				}
			}
		});
	}

	findByEmail(email: string) {
		return db.user.findUniqueOrThrow({
			where: {
				email
			},
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				avatar: true,
				createdAt: true,
				updatedAt: true,
				hashedPassword: true
			}
		});
	}

	updateFromSession(input: User): Promise<User> {
		return db.user.update({ where: { id: input.id }, data: { ...input } });
	}

	updateAvatar(user: User, image: Image): Promise<User> {
		return db.user.update({
			where: {
				id: user.id
			},
			data: {
				avatar: {
					connect: {
						id: image.id
					}
				}
			}
		});
	}

	updateData(input: User): Promise<User> {
		return db.user.update({
			where: {
				id: input.id
			},
			data: {
				email: input.email,
				firstName: input.firstName,
				lastName: input.lastName,
				verified: input.verified,
				firstTime: input.firstTime,
				updatedAt: new Date()
			}
		});
	}

	exists(email: string): Promise<boolean> {
		return db.user
			.findFirst({
				where: {
					email
				}
			})
			.then(Boolean);
	}
	findByIdWithRelations(userId: string): Promise<UserWithRelations> {
		return db.user.findUniqueOrThrow({
			where: {
				id: userId
			},
			include: {
				avatar: true
			}
		});
	}
}

const repo = Object.freeze(new UserRepository());
export { repo as UserRepository };
