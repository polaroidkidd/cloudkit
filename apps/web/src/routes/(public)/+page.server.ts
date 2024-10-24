import { PATHS, SERVER_FORM_ACTIONS } from '@cloudkit/ui-core';

import { auth } from '@lib/server/auth/lucia';
import { UserRepository } from '@lib/server/repository/user-repository';
import { fail } from '@sveltejs/kit';
import { Scrypt } from 'lucia';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms/server';

import { AuthenticateUserSchema } from '@lib/client/auth/schemas';
import type { Actions } from './$types';

export const actions: Actions = {
	[SERVER_FORM_ACTIONS.AUTHENTICATE]: async ({ request, cookies }) => {
		const signIn = await superValidate(request, zod(AuthenticateUserSchema));
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
