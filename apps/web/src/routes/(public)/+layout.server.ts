import type { Infer, SuperValidated } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';

import { AuthenticateUserSchema, RegisterUserSchema } from '@lib/client/auth/schemas';
import type { LayoutServerLoad } from './$types';

let authenticate: SuperValidated<Infer<typeof AuthenticateUserSchema>> | null = null;
let register: SuperValidated<Infer<typeof RegisterUserSchema>> | null = null;
export const load = (async ({ url }) => {
	if (authenticate === null) {
		authenticate = await superValidate(zod(AuthenticateUserSchema));
	}

	if (register === null) {
		register = await superValidate(zod(RegisterUserSchema));
	}

	const { pathname } = url;

	return {
		register,
		authenticate,
		pathname
	};
}) satisfies LayoutServerLoad;
