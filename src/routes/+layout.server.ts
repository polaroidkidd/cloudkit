import type { LayoutServerLoad } from './$types';

import { superValidate } from 'sveltekit-superforms/server';

import {
	signInSchema,
	signUpSchema,
	type SignInSchema,
	type SignUpSchema
} from '@lib/schemas/forms';
import { UserRepository } from '@lib/server/repository/UserRepository';
import type { SuperValidated } from 'sveltekit-superforms';

let signUp: SuperValidated<SignUpSchema> | null = null;
let logIn: SuperValidated<SignInSchema> | null = null;

export const load = (async ({ url, locals }) => {
	if (signUp === null) {
		signUp = await superValidate(signUpSchema);
	}

	if (logIn === null) {
		logIn = await superValidate(signInSchema);
	}

	const { pathname } = url;

	const session = await locals.auth.validate();
	if (session === null) {
		return {
			signUp: signUp,
			logIn: logIn,
			pathname
		};
	}
	const user = await UserRepository.findUserById(session.user.userId);

	return {
		user,
		pathname
	};
}) satisfies LayoutServerLoad;
