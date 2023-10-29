import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-cloudflare';
import preprocess from 'svelte-preprocess';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter({
			// See below for an explanation of these options
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			}
		}),

		alias: {
			'@mocks/*': './src/__mocks__/*',
			'@hooks/*': './src/hooks/*',
			'@model/*': './src/model/*',
			'@components/*': './src/lib/components/*',
			'@icons/*': './src/lib/components/icons/*',
			'@lib/*': './src/lib/*',
			'@pages/*': './src/pages/*',
			'@services/*': './src/lib/services/*',
			'@styles/*': './src/styles/*',
			'@utils/*': './src/lib/utils/*',
			'@assets/*': './src/assets/*'
		}
	}
};

export default config;
