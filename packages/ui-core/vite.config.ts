import { sveltekit } from '@sveltejs/kit/vite';
import { fileURLToPath } from 'node:url';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

import { svelteTesting } from '@testing-library/svelte/vite';

export default defineConfig({
	plugins: [tsconfigPaths(), sveltekit(), svelteTesting()],
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
		environment: 'jsdom',
		setupFiles: ['./vitest-setup.ts']
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern'
			}
		}
	},
	define: {
		SUPERFORMS_LEGACY: true
	},
	resolve: {
		alias: {
			'@cloudkit/db-schema': fileURLToPath(
				new URL('./../../packages/db-schema/src/generated/index.ts', import.meta.url)
			)
		}
	}
});
