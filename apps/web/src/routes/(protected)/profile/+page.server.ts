import { SERVER_FORM_ACTIONS } from '@cloudkit/ui-core';

import { EditUserSchema, PATHS } from '@cloudkit/ui-core';

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
		editUserForm
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
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

		const userWithRelations = await UserRepository.findByIdWithRelations(user.id);

		const avatar = formData.get('avatar');
		if (avatar instanceof File && userWithRelations !== null) {
			const image = await ImageRepository.update({
				data: userWithRelations,
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
	}
};
