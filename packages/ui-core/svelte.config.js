import nodeAdapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess()],

	kit: {
		adapter: nodeAdapter(),
		csrf: {
			checkOrigin: true
		},
		env: {
			dir: './../../'
		}
	}
};

export default config;
