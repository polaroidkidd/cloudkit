import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 3000
	},
	preview: {
		port: 3000
	},
	optimizeDeps: {
		esbuildOptions: {
			target: 'esnext'
		}
	},
	build: {
		target: 'es2020'
	}
});
