import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  root: './source',
  build: {
    outDir: '../',
    minify: 'terser',
    emptyOutDir: false
  },
  plugins: [
    createHtmlPlugin({
      minify: true, // 启用HTML压缩
    }),
  ],
})