import { sveltekit } from '@sveltejs/kit/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';
export default defineConfig({
	plugins: [tsconfigPaths(), sveltekit()],
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
