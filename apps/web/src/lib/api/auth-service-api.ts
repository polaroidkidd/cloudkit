import type { AuthenticateUserSchema, RegisterUserSchema } from '@lib/client/auth/schemas';
import axios from 'axios';
import type { Infer, SuperValidated } from 'sveltekit-superforms/client';
import { ApiServiceBase } from './base-api-service';
import type { UserWithRelations } from '@cloudkit/ui-core';
import type { AxiosResponse } from 'axios';

class AuthApiService extends ApiServiceBase {
	constructor() {
		super('/api/v1/auth');
	}

	createNewSession(data: SuperValidated<Infer<typeof AuthenticateUserSchema>>['data']) {
		return this.http.put('', data);
	}
	createNewUser(data: SuperValidated<Infer<typeof RegisterUserSchema>>['data']) {
		// We have to use a separate axios config here because the default config would convert the avatar to an base64 encoded string
		return axios.postForm<
			SuperValidated<Infer<typeof RegisterUserSchema>>['data'],
			AxiosResponse<UserWithRelations>
		>('/api/v1/auth', data);
	}
	deleteSession() {
		return this.http.delete('');
	}
	deleteSessionById(id: string) {
		return this.http.delete(`/${id}`);
	}
}

const api = Object.freeze(new AuthApiService());
export { api as AuthApiService };
