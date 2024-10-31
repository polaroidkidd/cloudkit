// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import forms from '@tailwindcss/forms';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import typography from '@tailwindcss/typography';
import { join } from 'path';
import type { Config } from 'tailwindcss';

// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';

const config = {
	// 2. Opt for dark mode to be handled via the class method
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'../../packages/ui-core/src/**/*.{html,js,svelte,ts}',
		// 3. Append the path to the Skeleton package
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}'),
		join(
			require.resolve('@skeletonlabs/skeleton'),
			'../../../packages/ui-core/src/**/*.{html,js,svelte,ts}'
		)
	],
	theme: {
		extend: {}
	},
	plugins: [
		forms,
		typography,
		// 4. Append the Skeleton plugin (after other plugins)
		require('@tailwindcss/container-queries'),
		skeleton({
			themes: {
				// Register each theme within this array:
				preset: [{ name: 'wintry', enhancements: true }]
			}
		})
	]
} satisfies Config;

export default config;
