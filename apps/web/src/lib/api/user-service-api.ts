import { RegisterUserSchema } from '@lib/client/auth/schemas';
import type { Infer, SuperValidated } from 'sveltekit-superforms/client';
import { ApiServiceBase } from './base-api-service';

class UserApiService extends ApiServiceBase {
	constructor() {
		super('/api/v1/user');
	}

	getCurrentUser() {
		return this.http.get('/');
	}

	deleteUser(collectionId: string) {
		return this.http.delete(`/${collectionId}`);
	}

	updateUser(data: SuperValidated<Infer<typeof RegisterUserSchema>>['data']) {
		return this.http.patch('/', data);
	}
	getUserById(id: string) {
		return this.http.get(`/${id}`);
	}
}

const api = Object.freeze(new UserApiService());
export { api as UserApiService };
