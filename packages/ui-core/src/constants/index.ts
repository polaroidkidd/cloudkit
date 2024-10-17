import { dev } from '$app/environment';

export enum MEMBER_STATUS {
	ADMIN = 'admin',
	MEMBER = 'member',
	NONE = 'none'
}

export const UPLOAD_FILTERS = {
	maxFileSize: 5_000_000, // Technically not 5MB, but for the sake of the UI, we'll say it is
	allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
} as const;



// eslint-disable-next-line turbo/no-undeclared-env-vars
export const isDevOrCi = dev || import.meta.env.MODE === 'ci';

export const UPLOAD_OPTIONS = {
	maxSizeMB: 1,
	maxWidthOrHeight: 1024,
	useWebWorker: false,
	preserveExif: true
} as const;
