import { AuthenticateSchema, RegistrationSchema } from '@cloudkit/ui-core';

import type { Infer, SuperValidated } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';

import type { LayoutServerLoad } from './$types';

let register: SuperValidated<Infer<typeof RegistrationSchema>> | null = null;
let authenticate: SuperValidated<Infer<typeof AuthenticateSchema>> | null = null;

export const load = (async ({ url }) => {
	if (register === null) {
		register = await superValidate(zod(RegistrationSchema));
	}

	if (authenticate === null) {
		authenticate = await superValidate(zod(AuthenticateSchema));
	}

	const { pathname } = url;

	return {
		register,
		authenticate,
		pathname
	};
}) satisfies LayoutServerLoad;
