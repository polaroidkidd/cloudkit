import type { LayoutServerLoad } from './$types';

import { superValidate } from 'sveltekit-superforms/server';

import type { SuperValidated } from 'sveltekit-superforms';
import {
	signUpSchema,
	type SignInSchema,
	type SignUpSchema,
	signInSchema,
	type CreateCommunitySchema,
	createOrUpdateCommunitySchema,
	type CreateEventSchema,
	createEventSchema
} from '@lib/schemas/forms';
import { UserRepository } from '@lib/server/repository/UserRepository';

let signUp: SuperValidated<SignUpSchema> | null = null;
let logIn: SuperValidated<SignInSchema> | null = null;
let createCommunity: SuperValidated<CreateCommunitySchema> | null = null;
let createEvent: SuperValidated<CreateEventSchema> | null = null;
export const load = (async ({ url, locals }) => {
	if (signUp === null) {
		signUp = await superValidate(signUpSchema);
	}

	if (logIn === null) {
		logIn = await superValidate(signInSchema);
	}

	if (createCommunity === null) {
		createCommunity = await superValidate(createOrUpdateCommunitySchema);
	}
	if (createEvent === null) {
		createEvent = await superValidate(createEventSchema);
	}
	const { pathname } = url;

	const session = await locals.auth.validate();
	if (!session) {
		return {
			signUp: signUp,
			logIn: logIn,
			pathname
		};
	}
	const user = await UserRepository.findUserById(session.user.userId);

	return {
		user,
		signUp,
		logIn,
		createCommunity,
		createEvent,
		pathname
	};
}) satisfies LayoutServerLoad;
