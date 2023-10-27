import type { UserRepository } from '@lib/server/repository/UserRepository';
import type { Prisma } from '@prisma/client';

export enum UserRepositoryMethods {
	FindUserById = 'FindUserById',
	DeleteById = 'DeleteById',
	FindAll = 'FindAll'
}
export interface IUserRepository {
	FindUserById: Prisma.PromiseReturnType<typeof UserRepository.findUserById>;
	DeleteById: Prisma.PromiseReturnType<typeof UserRepository.deleteById>;
	FindAll: Prisma.PromiseReturnType<typeof UserRepository.findAll>;
}

export type User = Prisma.UserGetPayload<{
	select: { firstName: true; lastName: true; avatar: true; id: true };
}>;
