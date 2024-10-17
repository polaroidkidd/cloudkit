import cloudflareAdapter from '@sveltejs/adapter-cloudflare';
import nodeAdapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const adapter =
	process.env.ENVIRONMENT === 'ci'
		? nodeAdapter()
		: cloudflareAdapter({
				// See below for an explanation of these options

				routes: {
					include: ['/*'],
					exclude: ['<all>']
				},
				platformProxy: {
					configPath: 'wrangler.toml',
					environment: process.env.ENVIRONMENT,
					experimentalJsonConfig: false,
					persist: false
				}
			});
/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess()],

	kit: {
		adapter,
		csrf: {
			checkOrigin: true
		},
		env: {
			dir: './../../'
		}
	}
};

export default config;
