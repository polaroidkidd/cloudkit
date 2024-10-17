import { UserSchema } from '@cloudkit/db-schema';
import { type Cookies } from '@sveltejs/kit';
import { z } from 'zod';
import { auth } from '../auth/lucia';
import {
	AccessDeniedError,
	CollectionAlreadyExistsError,
	InvalidSessionError,
	ResourceNotFoundError
} from '../errors';

function getSchema(request: Request): z.AnyZodObject | z.ZodOptional<z.AnyZodObject> {
	switch (request.method) {
		// TODO Implement switch case for all API routes
		case 'POST':
			return UserSchema;
		default:
			return z.object({});
	}
}
class Validation {
	async validateBody<T = z.AnyZodObject | z.ZodOptional<z.AnyZodObject>>(
		request: Request
	): Promise<T> {
		try {
			const schema = getSchema(request);
			const data = await request.json();
			return (await schema.parseAsync(data)) as T;
		} catch (parseError) {
			let err = parseError;
			if (err instanceof z.ZodError) {
				err = err.issues.map((e) => ({ path: e.path[0], message: e.message }));
			}
			throw err;
		}
	}

	async validateParams(request: Request, params: Record<string, string>) {
		try {
			const schema = getSchema(request);

			await schema.parseAsync(params);
		} catch (parseError) {
			let err = parseError;
			if (err instanceof z.ZodError) {
				err = err.issues.map((e) => ({ path: e.path[0], message: e.message }));
			}
			throw err;
		}
	}

	/**
	 *
	 * @param cookies
	 * @returns {Promise<ReturnType<typeof auth.validateSession>>}
	 * @throws {Error} If the session is invalid
	 * //TODO Remove with implementation of zen stack
	 */
	async validateSession(cookies: Cookies): Promise<ReturnType<typeof auth.validateSession> | void> {
		const { user, session } = await auth.validateSession(cookies.get(auth.sessionCookieName) ?? '');
		if (!user) {
			throw new InvalidSessionError();
		}
		return { user, session };
	}

	async validateRequest<T = z.AnyZodObject | z.ZodOptional<z.AnyZodObject>>({
		cookies,
		request
	}: {
		cookies?: Cookies;
		params?: Partial<Record<string, string>>;
		request?: Request;
	}) {
		let seessionValudation;
		let bodyValidation;
		if (cookies) {
			seessionValudation = await this.validateSession(cookies);
		}
		if (request) {
			bodyValidation = await this.validateBody<T>(request);
		}
		return {
			session: seessionValudation,
			body: bodyValidation
		};
	}

	handleError(
		e: AccessDeniedError | InvalidSessionError | ResourceNotFoundError | z.ZodError | unknown
	) {
		if (e instanceof InvalidSessionError) {
			return new Response('Invalid Session', { status: 401 });
		}
		if (e instanceof ResourceNotFoundError) {
			return new Response('Resource not found', { status: 404 });
		}
		if (e instanceof AccessDeniedError) {
			return new Response('Access denied', { status: 403 });
		}
		if (e instanceof z.ZodError) {
			return new Response(JSON.stringify(e), { status: 400 });
		}
		if (e instanceof CollectionAlreadyExistsError) {
			return new Response(e.message, { status: 409 });
		}

		return new Response(
			"Something went wrong on our end. We've been notivied and will look into it",
			{ status: 500 }
		);
	}
}

const frozen = Object.freeze(new Validation());
export { frozen as Validate };
