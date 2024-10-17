import { dev } from '$app/environment';

export enum MEMBER_STATUS {
	ADMIN = 'admin',
	MEMBER = 'member',
	NONE = 'none'
}

// eslint-disable-next-line turbo/no-undeclared-env-vars
export const isDevOrCi = dev || import.meta.env.MODE === 'ci';

