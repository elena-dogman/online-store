import { resolve } from 'path';
import { defineConfig } from 'vite';
export default defineConfig({
  // plugins: [eslint()],
  base: '/',
  build: {
    minify: false,
    sourcemap: true, // enable production source maps
    rollupOptions: {
      input: {
        // eslint-disable-next-line no-undef
        index: resolve(__dirname, 'index.html'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
  css: {
    devSourcemap: true, // enable CSS source maps during development
  },
});
