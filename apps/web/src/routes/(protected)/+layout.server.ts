import { PATHS } from '@cloudkit/ui-core';
import { auth } from '@lib/server/auth/lucia';
import { UserRepository } from '@lib/server/repository/user-repository';
import { redirect } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';

export const load = (async ({ url, cookies }) => {
	const { pathname } = url;

	const sessionId = cookies.get(auth.sessionCookieName);
	if (!sessionId) {
		redirect(302, PATHS.ROOT);
	}

	const { user } = await auth.validateSession(sessionId);
	return {
		user: await UserRepository.findById(user?.id ?? ''),
		pathname
	};
}) satisfies LayoutServerLoad;
