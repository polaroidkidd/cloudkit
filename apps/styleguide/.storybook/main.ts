import type { StorybookConfig } from '@storybook/sveltekit';
import { dirname, join } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
	return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
	core: {
		builder: '@storybook/builder-vite',
		disableTelemetry: true
	},
	stories: [
		'../src/**/*.mdx',
		'../src/**/*.stories.@(js|ts)',
		'../../../packages/ui-core/src/**/*.mdx',
		'../../../packages/ui-core/src/**/*.stories.@(svelte|ts)',
		'../tailwind.config.ts'
	],
	addons: [
		'@storybook/addon-svelte-csf',
		'storybook-addon-tailwind-autodocs',
		'@storybook/addon-themes',
		'storybook-dark-mode',
		getAbsolutePath('@storybook/addon-links'),
		getAbsolutePath('@storybook/addon-essentials'),
		getAbsolutePath('@storybook/addon-interactions'),
		getAbsolutePath('storybook-addon-tailwind-autodocs'),
		{
			name: 'storybook-addon-sass-postcss',
			options: {
				sassLoaderOptions: {
					implementation: require('postcss')
				}
			}
		}
	],
	framework: {
		name: '@storybook/sveltekit',
		options: {}
	}
};
export default config;
