import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { ImageOptionalDefaultsSchema, UserOptionalDefaultsSchema } from '@cloudkit/db-schema';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@cloudkit/db-schema/form';

import { z } from 'zod';
extendZodWithOpenApi(z);

export const UserDTO = UserOptionalDefaultsSchema;
export const FileDTO = z
	.any()
	.refine((files) => files?.length == 1, 'Image is required.')
	.refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
	.refine(
		(files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
		'.jpg, .jpeg, .png and .webp files are accepted.'
	)
	.optional()
	.or(z.string().optional());

export const ImageDTO = ImageOptionalDefaultsSchema.merge(
	z.object({
		file: FileDTO.optional()
	})
);

export const ZodErrorSchemaDTO = z.object({
	name: z.string(),
	issues: z.array(
		z.object({
			code: z.string(),
			expected: z.string(),
			received: z.string(),
			path: z.array(z.string()),
			message: z.string()
		})
	)
});
