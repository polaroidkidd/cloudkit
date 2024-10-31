import { isDevOrCi, PATH_GROUPS, PATHS } from '@cloudkit/ui-core';
import { auth } from '@lib/server/auth/lucia';
import { type Handle, redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	await auth.deleteExpiredSessions();
	const sessionId = event.cookies.get(auth.sessionCookieName);
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		if (event.route.id?.startsWith(PATH_GROUPS.PROTECTED)) {
			redirect(302, PATHS.ROOT);
			//  TODO Implement email verification
			// if (!user.verified) redirect(302, '/auth/verify/email');
		}
		return resolve(event);
	}

	const { session, user } = await auth.validateSession(sessionId);

	if (session && session.fresh) {
		const sessionCookie = auth.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: PATHS.ROOT,
			...sessionCookie.attributes
		});
	}
	if (!session) {
		const sessionCookie = auth.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: PATHS.ROOT,
			...sessionCookie.attributes
		});
	}
	event.locals.user = user;
	event.locals.session = session;

	if (user && event.route.id === PATH_GROUPS.PUBLIC) {
		redirect(302, PATHS.PROFILE);
	}
	return await resolve(event);
};

export function handleError({ event, error, message }) {
	console.error(error);
	console.error(message);
	if (!isDevOrCi) {
		const { cookies } = event;
		const token = cookies.get('auth_session');
		if (token) {
			cookies.delete('auth_session', { path: PATHS.ROOT });
		}
	}

	const errorId = crypto.randomUUID();
	return {
		message: `${errorId}: We're having some trouble logging you in. Please try again later`
	};
}
