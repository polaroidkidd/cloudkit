import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

import { auth, getUserSession } from '@lib/server/auth/lucia';
import { fail, redirect } from '@sveltejs/kit';

import { superValidate } from 'sveltekit-superforms/server';
import { editUserSchema } from '@lib/schemas/forms';

import { UserRepository } from '@lib/server/repository/UserRepository';
import { ImageRepository } from '@lib/server/repository/ImageRepository';

export const load = (async ({ locals }) => {
	const { email, lastName, firstName, avatarId } = await getUserSession(locals);
	const image = await ImageRepository.findImageById(avatarId);
	const editUserForm = await superValidate(
		{
			avatar: image?.url,
			firstName: firstName,
			lastName: lastName,
			email: email
		},
		editUserSchema
	);

	return {
		editUserForm
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	deleteAccount: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (session) {
			await auth.invalidateSession(session.sessionId);
			locals.auth.setSession(null);

			await UserRepository.deleteById(session.user.userId);
			throw redirect(302, '/');
		}
		return new Response('Error Deleting Account', { status: 500 });
	},
	signOut: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) {
			return fail(401);
		}
		await auth.invalidateSession(session.sessionId);
		locals.auth.setSession(null);
		throw redirect(302, '/');
	},
	updateUser: async ({ request, locals }) => {
		const formData = await request.formData();

		const editUserForm = await superValidate(formData, editUserSchema);
		if (!editUserForm.valid) {
			return fail(400, { form: editUserForm });
		}

		try {
			const { userId } = await getUserSession(locals);
			const user = await UserRepository.findUserById(userId);
			const avatar = formData.get('avatar');
			if (avatar instanceof File) {
				const image = await ImageRepository.handleImageUpload(avatar, 'cloudkit/users/avatars');
				await auth.updateUserAttributes(userId, {
					email: editUserForm.data.email.toLowerCase(),
					firstName: editUserForm.data.firstName.trim(),
					lastName: editUserForm.data.lastName.trim(),
					avatarId: image.id,
					updatedAt: new Date()
				});
				await ImageRepository.deleteById(user.avatarId);
				editUserForm.data.avatar = image.url;
			} else {
				await auth.updateUserAttributes(userId, {
					email: editUserForm.data.email.toLowerCase(),
					firstName: editUserForm.data.firstName.trim(),
					lastName: editUserForm.data.lastName.trim(),
					updatedAt: new Date()
				});
			}
			return {
				editUserForm
			};
		} catch (e) {
			return fail(503, {
				message: 'An unknown error occurred. Please try again later.'
			});
		}
	}
};
