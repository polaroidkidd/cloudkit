import { Validate } from '@lib/server/middleware/validate';
import type { RequestHandler } from '@sveltejs/kit';

export const DELETE: RequestHandler = async () => {
	return new Response(null, { status: 500 });
};
export const POST: RequestHandler = async ({ request, cookies }) => {
	const { body } = await Validate.validateRequest({ request, cookies });
	// eslint-disable-next-line no-console
	console.info('body: ', body);

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
