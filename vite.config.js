import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/',
  root: './source',
  build: {
    outDir: '../dist',
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
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: "My Resume",
        short_name: "Resume",
        description: "Personal resume website",
        theme_color: "#ffffff",
        start_url: "/",
        display: "standalone",
        icons: [
          {
            src: "assets/favicon.svg",
            sizes: "192x192",
            type: "image/svg+xml"
          },
          {
            src: "assets/favicon.svg",
            sizes: "512x512",
            type: "image/svg+xml"
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
          {
            urlPattern: /\.(?:js|css)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
            },
          },
        ],
      }
    })
  ],
})