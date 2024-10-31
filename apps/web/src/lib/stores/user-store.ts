import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';
import { STORE_CONTEXTS } from './constants';
import type { UserWithRelations } from '@cloudkit/ui-core';

export function initUserStore<T extends UserWithRelations = UserWithRelations>(user: T | null) {
	const store = writable<T | null>(user);
	setContext(STORE_CONTEXTS.User, store);
	return store;
}

export function getUserStore<
	T extends Record<string, string | number | boolean> = NonNullable<unknown>
>(storeExtension?: T) {
	const userStore: Writable<UserWithRelations & T> = getContext(STORE_CONTEXTS.User);
	if (storeExtension) {
		userStore.update((user) => ({
			...user,
			...storeExtension
		}));
	}
	return userStore;
}
