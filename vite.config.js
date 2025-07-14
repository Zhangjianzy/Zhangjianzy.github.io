import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  root: './source',
  build: {
    outDir: '../',
    minify: 'terser',
    emptyOutDir: false,
    rollupOptions: {
      input: './source/index.html',
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  },
  plugins: [
    createHtmlPlugin({
      minify: true, // 启用HTML压缩
    }),
  ],
})