import { UserRepository } from '@lib/server/repository/UserRepository';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const userid = params?.userid;

	return {
		streamed: { user: UserRepository.findUserById(userid as string) }
	};
}) satisfies PageServerLoad;
