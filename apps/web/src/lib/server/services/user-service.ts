import type { User, UserWithRelations } from '@cloudkit/ui-core';
import type { RegisterUserSchema } from '@lib/client/auth/schemas';
import type { Infer, SuperValidated } from 'sveltekit-superforms/server';
import { UserRepository } from '../repository/user-repository';

// TODO implement ZenStack to manage access
class UserService {
	static _instanceCache: UserService;

	static instance(): UserService {
		if (!this._instanceCache) {
			this._instanceCache = new this();
		}

		return this._instanceCache;
	}

	async createUser(
		data: SuperValidated<Infer<typeof RegisterUserSchema>>['data']
	): Promise<UserWithRelations> {
		return UserRepository.create(data);
	}

	async updateUser(data: User): Promise<User> {
		return UserRepository.updateFromSession({ ...data, firstTime: false });
	}

	async deleteUser(data: UserWithRelations): Promise<boolean> {
		return UserRepository.deleteById(data.id);
	}
}

const repo = Object.freeze(new UserService());
export { repo as UserService };
