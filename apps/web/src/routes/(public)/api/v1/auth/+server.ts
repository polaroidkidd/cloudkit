import { RegisterUserSchema } from '@lib/client/auth/schemas';
import { auth } from '@lib/server/auth/lucia';
import { UserRepository } from '@lib/server/repository/user-repository';
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { PATHS } from '@cloudkit/ui-core';
import { UserService } from '@lib/server/services/user-service';

export const DELETE: RequestHandler = async () => {
	return new Response(null, { status: 500 });
};
export const POST: RequestHandler = async ({ request, cookies }) => {
	await auth.validateSession(cookies.get(auth.sessionCookieName) ?? '');

	const data = await request.formData();
	const {
		success,
		error,
		data: postData
	} = RegisterUserSchema.safeParse(Object.fromEntries(data.entries()));
	if (success && postData) {
		const userExists = await UserRepository.exists(postData.email);

		if (!userExists) {
			const created = await UserService.createUser(postData);
			const session = await auth.createSession(created.id, {});
			const sessionCookie = auth.createSessionCookie(session.id);
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: PATHS.ROOT,
				...sessionCookie.attributes
			});
			return json(created);
		} else {
			return new Response(null, { status: 409 });
		}
	} else {
		console.error('errors:', error);
	}
	/*
			const formData = await request.formData();
		const signUp = await superValidate(formData, zod(RegistrationSchema));
		if (!signUp.valid) {
			return fail(400, { form: signUp });
		}

		if (signUp.data.password !== signUp.data.confirmPassword) {
			return setError(signUp, 'confirmPassword', 'Passwords do not match');
		}

		try {
			const userExists = await UserRepository.exists(signUp.data.email);
			if (!userExists) {
				const hashedPassword = await new Scrypt().hash(signUp.data.password);

				const avatar = formData.get('avatar') as File;
				if (avatar instanceof File) {
					const created = await UserRepository.create({
						email: signUp.data.email.toLowerCase(),
						firstName: signUp.data.firstName,
						lastName: signUp.data.lastName,
						hashedPassword: hashedPassword,

						avatar: avatar,
						verified: false,
						firstTime: true
					});
					const session = await auth.createSession(created.id, {});
					const sessionCookie = auth.createSessionCookie(session.id);
					cookies.set(sessionCookie.name, sessionCookie.value, {
						path: PATHS.ROOT,
						...sessionCookie.attributes
					});
				} else {
					return setError(signUp, 'avatar', 'Avatar has to be a valid file');
				}
			} else {
				return setError(signUp, 'email', 'E-Mail already taken');
			}
		} catch (e) {
			return fail(503, {
				message: 'An unknown error occurred. Please try again later.'
			});
		}
	*/
	return new Response(null, { status: 500 });
};
export const PUT: RequestHandler = async () => {
	return new Response(null, { status: 500 });
};
