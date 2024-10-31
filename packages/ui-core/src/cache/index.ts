import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';

export const cache = new Map();

export const cacheFetch = async <T>(key: string, fetchCallback: () => ReturnType<typeof fetch>) => {
	if (browser && cache.has(key)) {
		console.warn(`Cache hit for ${key}`);
		return cache.get(key) as T;
	}
	const response = await fetchCallback();

	if (!response.ok) {
		const message = await response.json();
		throw error(response.status, message);
	}
	const result = await response.json();
	console.warn(`Caching ${key}`);
	cache.set(key, result);

	return result as T;
};

export const clearCache = (key: string) => {
	if (browser && cache.has(key)) {
		console.warn(`Clearing cache for ${key}`);
		cache.delete(key);
	}
};
