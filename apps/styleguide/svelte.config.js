import nodeAdapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';


const config = {
	preprocess: [vitePreprocess()],

	kit: {
		adapter: nodeAdapter(),
		csrf: {
			checkOrigin: true
		},
		env: {
			dir: './../../'
		},
	}
};

export default config;
