import { SERVER_FORM_ACTIONS } from '@cloudkit/ui-core';

import { AuthenticateSchema, PATHS, RegistrationSchema } from '@cloudkit/ui-core';

import { auth } from '@lib/server/auth/lucia';
import { UserRepository } from '@lib/server/repository/user-repository';
import { fail } from '@sveltejs/kit';
import { Scrypt } from 'lucia';
import { zod } from 'sveltekit-superforms/adapters';
import { message, setError, superValidate } from 'sveltekit-superforms/server';

import type { Actions } from './$types';

export const actions: Actions = {
	[SERVER_FORM_ACTIONS.REGISTER]: async ({ request, cookies }) => {
		const formData = await request.formData();
		const signUp = await superValidate(formData, zod(RegistrationSchema));
		if (!signUp.valid) {
			return fail(400, { form: signUp });
		}

		if (signUp.data.password !== signUp.data.confirmPassword) {
			return setError(signUp, 'confirmPassword', 'Passwords do not match');
		}

		try {
			const userExists = await UserRepository.exists(signUp.data.email);
			if (!userExists) {
				const hashedPassword = await new Scrypt().hash(signUp.data.password);

				const avatar = formData.get('avatar') as File;
				if (avatar instanceof File) {
					const created = await UserRepository.create({
						email: signUp.data.email.toLowerCase(),
						firstName: signUp.data.firstName,
						lastName: signUp.data.lastName,
						hashedPassword: hashedPassword,

						avatar: avatar,
						verified: false,
						firstTime: true
					});
					const session = await auth.createSession(created.id, {});
					const sessionCookie = auth.createSessionCookie(session.id);
					cookies.set(sessionCookie.name, sessionCookie.value, {
						path: PATHS.ROOT,
						...sessionCookie.attributes
					});
				} else {
					return setError(signUp, 'avatar', 'Avatar has to be a valid file');
				}
			} else {
				return setError(signUp, 'email', 'E-Mail already taken');
			}
		} catch (e) {
			return fail(503, {
				message: 'An unknown error occurred. Please try again later.'
			});
		}
	},
	[SERVER_FORM_ACTIONS.AUTHENTICATE]: async ({ request, cookies }) => {
		const signIn = await superValidate(request, zod(AuthenticateSchema));
		if (!signIn.valid) {
			return fail(400, { form: signIn });
		}

		const userExists = await UserRepository.exists(signIn.data.email);
		if (!userExists) {
			return message(signIn, 'E-Mail or password incorrect', { status: 400 });
		}
		const user = await UserRepository.findByEmail(signIn.data.email);
		const validPassword = await new Scrypt().verify(user.hashedPassword, signIn.data.password);
		if (!validPassword) {
			return message(signIn, 'E-Mail or password incorrect', { status: 400 });
		}
		const session = await auth.createSession(user.id, {});
		const sessionCookie = auth.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: PATHS.ROOT,
			...sessionCookie.attributes
		});
	}
};
