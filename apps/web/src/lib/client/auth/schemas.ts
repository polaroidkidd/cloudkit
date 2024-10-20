import { ALLOWED_STRINGS, ERROR_MESSAGE } from '@cloudkit/ui-core';
import { z } from 'zod';

export const MAX_FILE_SIZE = 500000;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const ImageSchema = z
	.any()
	.refine((files) => files?.length == 1, 'Image is required.')
	.refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
	.refine(
		(files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
		'.jpg, .jpeg, .png and .webp files are accepted.'
	)
	.optional()
	.or(z.string().optional());

export const RegisterUserSchema = z.object({
	firstName: z.string().min(1).max(32).regex(ALLOWED_STRINGS, ERROR_MESSAGE),
	lastName: z.string().min(1).max(32).regex(ALLOWED_STRINGS, ERROR_MESSAGE),
	password: z.string().min(8),
	confirmPassword: z.string().min(8),
	email: z.string().email().min(3),
	avatar: z.string().optional().or(ImageSchema)
});

export const AuthenticateUserSchema = z.object({
	email: z.string().email().min(3),
	password: z.string().min(8)
});
