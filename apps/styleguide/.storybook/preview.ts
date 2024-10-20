import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { Preview, SvelteRenderer } from '@storybook/svelte';
import '../src/app.postcss';

const preview: Preview = {
	parameters: {
		darkMode: { stylePreview: true, classTarget: 'html' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		}
	},
	decorators: [
		withThemeByDataAttribute<SvelteRenderer>({
			themes: {
				wintry: 'wintry'
			},
			defaultTheme: 'wintry',
			parentSelector: 'body',
			attributeName: 'data-theme'
		})
	]
};

export default preview;
