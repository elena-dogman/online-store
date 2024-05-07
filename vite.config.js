import { resolve } from 'path';
import { defineConfig } from 'vite';
export default defineConfig({
  base: '/',
  build: {
    minify: false,
    sourcemap: true,
    rollupOptions: {
      input: {
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
    devSourcemap: true,
  },
  define: {
    global: {},
  },
  resolve: {
    alias: {
      'node-fetch': 'isomorphic-fetch',
    },
  },
});
