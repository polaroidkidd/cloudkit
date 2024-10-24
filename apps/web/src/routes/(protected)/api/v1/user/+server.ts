import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	return new Response(null, { status: 500 });
};

export const PATCH: RequestHandler = async () => {
	return new Response(null, { status: 500 });
};
