import { UserRepository } from '@lib/server/repository/UserRepository';
import type { PageServerLoad } from './$types';

export const load = (async ({ platform }) => {
	const putResponse = await platform?.env.CLOUDKIT_KV.put('test', 'test');
	console.info('response: ', putResponse);
	const getResponse = await platform?.env.CLOUDKIT_KV.list();
	console.info('response: ', getResponse);
	return {
		streamed: { users: UserRepository.findAll() }
	};
}) satisfies PageServerLoad;
