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
		},
		alias: {
			'@mocks/*': './src/__mocks__/*',
			'@hooks/*': './src/hooks/*',
			'@components/*': './src/lib/components/*',
			'@lib/*': './src/lib/*',
			'@pages/*': './src/pages/*',
			'@services/*': './src/lib/services/*',
			'@styles/*': './src/styles/*',
			'@utils/*': './src/lib/utils/*',
			'@assets/*': './src/assets/*',
			'@middleware/*': './src/lib/server/middleware/*'
		}
	}
};

export default config;
