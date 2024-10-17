import type { User } from '@cloudkit/db-schema';
import { ApiServiceBase } from './base-api-service';

class UserServiceApi extends ApiServiceBase {
	constructor() {
		super('/api/collections');
	}

	createUser(data: User): Promise<User> {
		return this.http.post('/', data);
	}
	deleteUser(collectionId: string) {
		return this.http.delete(`/${collectionId}`);
	}
	updateuser(collectionId: string, collection: string, parentId?: string) {
		return this.http.put(`/${collectionId}`, { collection, parentId });
	}
}

const api = Object.freeze(new UserServiceApi());
export { api as UserServiceApi };
