import { z } from 'zod';

const ALLOWED_STRINGS =
	/^[ !?_"+.,():;&#@%ÀÁÂÃÄÅǍĀĄÆÇČĆÈÉÊËĚĒĘǦÌÍÎÏĪÐĐĎĹĽŁÑŇŃÒÓÔÕÖŌ×ØŘŔŠŚŤÙÚÛÜŮŪÝΫŽŻŹÞßàáâãäåǎāąæçčćďđèéêëěēęǧìíîïīðĺľłñňńòóôõöō÷øřŕšśťùúûüůūýþÿžżźa-zA-Z0-9-\u0027\u2019ŐőŰűĞğİıŞş¡¿ªº£¢€§]*$/;
const ERROR_MESSAGE = 'This field may only contain letters or numbers';
export const contactSchema = z.object({
	firstName: z.string().min(1).max(32).regex(ALLOWED_STRINGS, ERROR_MESSAGE),
	lastName: z.string().min(1).max(32).regex(ALLOWED_STRINGS, ERROR_MESSAGE),
	text: z.string().min(10).max(300),
	email: z.string().email().min(3)
});

export const signUpSchema = z.object({
	firstName: z.string().min(1).max(32).regex(ALLOWED_STRINGS, ERROR_MESSAGE),
	lastName: z.string().min(1).max(32).regex(ALLOWED_STRINGS, ERROR_MESSAGE),
	password: z.string().min(8),
	confirmPassword: z.string().min(8),
	email: z.string().email().min(3),
	avatar: z.string().optional(),
	imgVariations: z.array(z.string())
});

export const signInSchema = z.object({
	email: z.string().email().min(3),
	password: z.string().min(8)
});
const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const editUserSchema = z.object({
	firstName: z.string().min(1).max(32).regex(ALLOWED_STRINGS, ERROR_MESSAGE),
	lastName: z.string().min(1).max(32).regex(ALLOWED_STRINGS, ERROR_MESSAGE),
	email: z.string().email().min(3),
	avatar: z
		.any()
		.refine((files) => files?.length == 1, 'Image is required.')
		.refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
		.refine(
			(files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
			'.jpg, .jpeg, .png and .webp files are accepted.'
		)
		.optional()
		.or(z.string().optional())
});

export const createOrUpdateCommunitySchema = z.object({
	name: z.string().min(1).max(100).regex(ALLOWED_STRINGS, ERROR_MESSAGE),
	description: z.string().min(1).max(200).regex(ALLOWED_STRINGS, ERROR_MESSAGE),
	place: z.string().min(1).max(100).regex(ALLOWED_STRINGS, ERROR_MESSAGE),
	placeId: z.number(),
	imgVariations: z.array(z.string()),
	tags: z.array(z.string()).optional(),
	id: z.string().optional()
});

export const createEventSchema = z.object({
	title: z.string().min(1).max(100).regex(ALLOWED_STRINGS, ERROR_MESSAGE),
	description: z.string().min(1).max(100).regex(ALLOWED_STRINGS, ERROR_MESSAGE),
	location: z.string().min(1).max(100).regex(ALLOWED_STRINGS, ERROR_MESSAGE),
	dateAndTime: z.string(),
	imgVariations: z.array(z.string()),
	maxAttendees: z.number().optional(),
	sponsors: z.array(z.string().min(1).max(100).regex(ALLOWED_STRINGS, ERROR_MESSAGE)).optional(),
	communityId: z.string()
});
export type EditUserSchema = typeof editUserSchema;
export type ContactSchema = typeof contactSchema;
export type SignUpSchema = typeof signUpSchema;
export type SignInSchema = typeof signInSchema;
export type CreateCommunitySchema = typeof createOrUpdateCommunitySchema;
export type CreateEventSchema = typeof createEventSchema;
