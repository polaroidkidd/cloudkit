import { ALLOWED_STRINGS, ERROR_MESSAGE } from '@cloudkit/ui-core';
import * as v from 'valibot';

export const RegisterUserSchema = v.object({
	firstName: v.pipe(
		v.string(),
		v.minLength(1, 'Field cannot be empty'),
		v.maxLength(32, 'Cannot be longer than 32 characters'),
		v.regex(ALLOWED_STRINGS, ERROR_MESSAGE)
	),
	lastName: v.pipe(
		v.string(),
		v.minLength(1, 'Field cannot be empty'),
		v.maxLength(32, 'Cannot be longer than 32 characters'),
		v.regex(ALLOWED_STRINGS, ERROR_MESSAGE)
	),
	password: v.pipe(
		v.string(),
		v.minLength(1, 'Field cannot be empty'),
		v.maxLength(32, 'Cannot be longer than 32 characters'),
		v.regex(ALLOWED_STRINGS, ERROR_MESSAGE)
	),
	confirmPassword: v.pipe(
		v.string(),
		v.minLength(1, 'Field cannot be empty'),
		v.maxLength(32, 'Cannot be longer than 32 characters'),
		v.regex(ALLOWED_STRINGS, ERROR_MESSAGE)
	),
	email: v.pipe(v.string(), v.email()),
	avatar: v.string(),
	imgVariations: v.array(v.string())
});

export const AuthenticateUserSchema = v.object({
	email: v.pipe(v.string(), v.email()),
	password: v.pipe(
		v.string(),
		v.minLength(1, 'Field cannot be empty'),
		v.maxLength(32, 'Cannot be longer than 32 characters'),
		v.regex(ALLOWED_STRINGS, ERROR_MESSAGE)
	)
});
