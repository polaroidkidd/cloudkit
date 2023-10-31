import type { ImageRepository } from '@lib/server/repository/ImageRepository';
import type { UserRepository } from '@lib/server/repository/UserRepository';
import type { Prisma } from '@prisma/client/edge';

/**
 * Enum containing all available methods for the UserRepository.
 */
export enum UserRepositoryMethods {
	FindUserById = 'FindUserById',
	DeleteById = 'DeleteById',
	FindAll = 'FindAll'
}

/**
 * Interface defining the methods available in the UserRepository.
 */
export interface IUserRepository {
	FindUserById: Prisma.PromiseReturnType<typeof UserRepository.findUserById>;
	DeleteById: Prisma.PromiseReturnType<typeof UserRepository.deleteById>;
	FindAll: Prisma.PromiseReturnType<typeof UserRepository.findAll>;
}

/**
 * User type definition.
 */
export type User = Prisma.UserGetPayload<{
	select: { firstName: true; lastName: true; avatar: true; id: true };
}>;

export type Image = Prisma.PromiseReturnType<typeof ImageRepository.findImageById>;
