import { PATHS } from '@cloudkit/ui-core';
import { auth } from '@lib/server/auth/lucia';
import { UserRepository } from '@lib/server/repository/user-repository';
import { redirect } from '@sveltejs/kit';

import {
	CreateCollectionchema,
	EditCollectionSchema,
	EditItemSchema,
	ItemsWithCollectionSchema
} from '@cloudkit/ui-core';

import { CollectionService } from '@lib/server/services/user-service';
import { superValidate, type Infer, type SuperValidated } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { LayoutServerLoad } from './$types';

let createGroup: SuperValidated<Infer<typeof CreateCollectionchema>> | null = null;
let editItem: SuperValidated<Infer<typeof EditItemSchema>> | null = null;
let editCollection: SuperValidated<Infer<typeof EditCollectionSchema>> | null = null;
let addItemsToCollectionForm: SuperValidated<Infer<typeof ItemsWithCollectionSchema>> | null = null;

export const load = (async ({ url, cookies }) => {
	const { pathname } = url;

	const sessionId = cookies.get(auth.sessionCookieName);
	if (!sessionId) {
		redirect(302, PATHS.ROOT);
	}

	if (createGroup === null) {
		createGroup = await superValidate(zod(CreateCollectionchema));
	}
	if (editCollection === null) {
		editCollection = await superValidate(zod(EditCollectionSchema));
	}

	if (editItem === null) {
		editItem = await superValidate(zod(EditItemSchema));
	}
	if (addItemsToCollectionForm === null) {
		addItemsToCollectionForm = await superValidate(
			addItemsToCollectionForm,
			zod(ItemsWithCollectionSchema)
		);
	}

	const { user } = await auth.validateSession(sessionId);
	return {
		user: await UserRepository.findById(user?.id ?? ''),
		pathname,
		formData: { createGroup, editItem, editCollection, addItemsToCollectionForm },
		collections: CollectionService.findAllCollectionsByOwner(user?.id ?? '')
	};
}) satisfies LayoutServerLoad;
