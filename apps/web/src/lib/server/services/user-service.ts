import type { User } from '@cloudkit/ui-core';
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

	async createUser(data: User): Promise<User> {
		return UserRepository.create(data);
	}
	async updateUser(data: User): Promise<User> {
		return UserRepository.updateFromSession({ ...data, firstTime: false });
	}
	async deleteUser(data: User): Promise<boolean> {
		return UserRepository.deleteById(data.id);
	}
}

const repo = Object.freeze(new UserService());
export { repo as UserService };
