import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

import { purgeCss } from 'vite-plugin-tailwind-purgecss';

export default defineConfig({
	plugins: [tsconfigPaths(), sveltekit(), purgeCss()],
	server: {
		port: 4000
	},
	preview: {
		port: 4000
	},
	optimizeDeps: {
		esbuildOptions: {
			target: 'esnext'
		}
	},
	build: {
		target: 'es2020'
	},
	test: {
		include: ['tests/unit/**/*.{test,spec}.{js,ts}']
	}
});
