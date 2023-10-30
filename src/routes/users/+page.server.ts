import { UserRepository } from '@lib/server/repository/UserRepository';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		streamed: { users: UserRepository.findAll() }
	};
}) satisfies PageServerLoad;
