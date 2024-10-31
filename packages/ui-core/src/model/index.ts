import {
	type ImageOptionalDefaults,
	type ImageOptionalDefaultsWithRelations,
	type UserOptionalDefaults,
	type UserOptionalDefaultsWithRelations
} from '@cloudkit/db-schema';

import type { SetRequired } from 'type-fest';

export type Image = SetRequired<ImageOptionalDefaults, 'id' | 'createdAt' | 'updatedAt'>;
export type ImageWithRelations = SetRequired<
	ImageOptionalDefaultsWithRelations,
	'id' | 'createdAt' | 'updatedAt'
>;

export type User = SetRequired<UserOptionalDefaults, 'id' | 'createdAt' | 'updatedAt'>;
export type UserWithRelations = Omit<
	SetRequired<UserOptionalDefaultsWithRelations, 'id' | 'createdAt' | 'updatedAt'>,
	'hashedPassword' | 'sessions'
>;

export type UserApiPost = Omit<User, 'sessions' | 'id' | 'createdAt' | 'updatedAt'>;

export type CloudflareImagePostResponseResult = {
	id: string;
	filename?: string;
	uploaded?: string;
	requireSignedURLs?: boolean;
	variants?: string[];
};

export type CloudflareImagePostResponse = {
	result: CloudflareImagePostResponseResult;
	result_info: unknown;
	success: boolean;
	errors: string[];
	messages: string[];
};

export type CloudflareImageDeleteResponse = {
	result: Record<string, string>;
	result_info: null | string;
	success: boolean;
	errors: [];
	messages: [];
};

export type Actions = {
	title: string;
	callback?: (...args: unknown[]) => unknown;
	href?: string;
	disabled?: boolean;
	level?: 'primary' | 'success' | 'warning' | 'error';
}[];
