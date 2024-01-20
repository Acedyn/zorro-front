import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { fileURLToPath, URL } from 'node:url';
import goWasm from 'vite-plugin-golang-wasm'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
	plugins: [
    sveltekit(),
    goWasm(),
  ],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
