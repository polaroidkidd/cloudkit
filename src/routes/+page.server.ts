import { superValidate } from 'sveltekit-superforms/server';
import type { Actions } from './$types';

import { fail, redirect } from '@sveltejs/kit';

import { signInSchema, signUpSchema } from '@lib/schemas/forms';
import { auth } from '@lib/server/auth/lucia';
import { setError } from 'sveltekit-superforms/server';

import { ImageRepository } from '@lib/server/repository/ImageRepository';
import { Prisma } from '@prisma/client/edge';
import { LuciaError } from 'lucia';
import { v4 as uuidv4 } from 'uuid';

export const actions: Actions = {
	signUp: async ({ request, locals }) => {
		const formData = await request.formData();
		const signUp = await superValidate(formData, signUpSchema);
		if (!signUp.valid) {
			return fail(400, { form: signUp });
		}

		if (signUp.data.password !== signUp.data.confirmPassword) {
			return setError(signUp, 'confirmPassword', 'Passwords do not match');
		}

		try {
			const avatar = formData.get('avatar');
			const image = await ImageRepository.handleImageUpload(
				avatar as File,
				'cloudkit/users/avatars'
			);
			const user = await auth.createUser({
				key: {
					providerId: 'username',
					providerUserId: signUp.data.email.toLowerCase(),
					password: signUp.data.password
				},
				attributes: {
					email: signUp.data.email,
					firstName: signUp.data.firstName,
					lastName: signUp.data.lastName,
					bio: null,
					avatarId: image.id,
					createdAt: new Date(),
					updatedAt: new Date(),
					id: uuidv4(),
					verified: false
				}
			});
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});
			locals.auth.setSession(session);
		} catch (e) {
			console.log(e);
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') {
					return setError(signUp, 'email', 'E-Mail already taken');
				}
			}
			return fail(503, {
				message: 'An unknown error occurred. Please try again later.'
			});
		}
		throw redirect(302, '/home');
	},
	signIn: async ({ request, locals }) => {
		const signIn = await superValidate(request, signInSchema);
		if (!signIn.valid) {
			return fail(400, { form: signIn });
		}
		try {
			const user = await auth.useKey(
				'username',
				signIn.data.email.toLowerCase(),
				signIn.data.password
			);
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});
			locals.auth.setSession(session);
		} catch (e) {
			console.error(e);
			if (
				e instanceof LuciaError &&
				(e.message === 'AUTH_INVALID_KEY_ID' || e.message === 'AUTH_INVALID_PASSWORD')
			) {
				return fail(400, { message: 'Email not found or incorrect password', signIn });
			}
			return fail(502, {
				message: 'An unknown error occurred'
			});
		}
		throw redirect(302, '/home');
	},

	signOut: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) {
			return fail(401);
		}
		await auth.invalidateSession(session.sessionId);
		locals.auth.setSession(null);
		throw redirect(302, '/');
	}
};
