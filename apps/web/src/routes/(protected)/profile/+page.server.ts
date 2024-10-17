import { SERVER_FORM_ACTIONS } from '@cloudkit/ui-core';

import { EditUserSchema, PATHS } from '@cloudkit/ui-core';

import { auth } from '@lib/server/auth/lucia';
import { ImageRepository } from '@lib/server/repository/image-repository';
import { UserRepository } from '@lib/server/repository/user-repository';
import { fail, redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';

import type { Actions, PageServerLoad } from './$types';

export const load = (async (event) => {
	const user = event.locals.user;

	if (!user) {
		redirect(302, PATHS.ROOT);
	}

	const editUserForm = await superValidate(
		{
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email
		},
		zod(EditUserSchema)
	);
	return {
		editUserForm,
		user
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	[SERVER_FORM_ACTIONS.DELETE_USER]: async ({ locals, cookies }) => {
		const sessionId = cookies.get(auth.sessionCookieName);
		if (!sessionId) {
			locals.user = null;
			locals.session = null;
			cookies.delete(auth.sessionCookieName, { path: PATHS.ROOT });
			redirect(302, PATHS.ROOT);
		}

		const { session, user } = await auth.validateSession(sessionId);
		if (session && user) {
			await UserRepository.deleteById(user.id);

			await auth.invalidateSession(sessionId);

			redirect(302, PATHS.ROOT);
		}
		return new Response('Error Deleting Account', { status: 500 });
	},
	[SERVER_FORM_ACTIONS.UPDATE_USER]: async ({ request, locals }) => {
		const user = locals.user;
		if (!user) {
			redirect(302, PATHS.ROOT);
		}
		const formData = await request.formData();
		const editUserForm = await superValidate(formData, zod(EditUserSchema));
		if (!editUserForm.valid) {
			return fail(400, { form: editUserForm });
		}

		const avatarEntry = await ImageRepository.findByUserId(user.id);

		const avatar = formData.get('avatar');
		if (avatar instanceof File && avatarEntry !== null) {
			const image = await ImageRepository.update({
				data: avatarEntry,
				image: avatar
			});

			editUserForm.data.avatar = image;
			// await UserRepository.updateAvatar(locals.user!, avatarEntry);
		}
		// await UserRepository.updateData({
		// 	...locals.user,
		// 	firstName: editUserForm.data.firstName,
		// 	lastName: editUserForm.data.lastName,
		// 	email: editUserForm.data.email
		// });

		return {
			editUserForm
		};
	},

	[SERVER_FORM_ACTIONS.SIGN_OUT]: async ({ locals, cookies }) => {
		if (!locals.session) {
			return fail(401);
		}
		await auth.invalidateSession(locals.session.id);
		const sessionCookie = auth.createBlankSessionCookie();
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: PATHS.ROOT,
			...sessionCookie.attributes
		});

		redirect(302, PATHS.ROOT);
	}
};
