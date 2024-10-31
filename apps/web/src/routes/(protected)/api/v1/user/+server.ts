import { auth } from '@lib/server/auth/lucia';
import { InvalidSessionError } from '@lib/server/errors';
import { RequestValidator } from '@lib/server/middleware/validate';
import { UserService } from '@lib/server/services/user-service';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	return new Response(null, { status: 500 });
};

export const PATCH: RequestHandler = async () => {
	return new Response(null, { status: 500 });
};

export const DELETE: RequestHandler = async ({ cookies }) => {
	try {
		const { user, session } = await RequestValidator.validateSession(cookies);
		const success = await UserService.deleteUser(user!);
		if (success) {
			await auth.invalidateSession(session!.id);
			return new Response(null, { status: 200 });
		}
	} catch (e) {
		if (e instanceof InvalidSessionError) {
			return new Response(null, { status: 401 });
		}
	}
	return new Response(null, { status: 500 });
};
