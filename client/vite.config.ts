import { resolve } from 'node:path'

// import basicSSL from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
// import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		//		basicSSL(),
		// 压缩配置
		//		viteCompression({
		//			verbose: true,
		//			disable: false,
		//			threshold: 2048,
		//			algorithm: 'gzip',
		//			ext: '.tgz',
		//		}),
	],

	// Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
	// prevent vite from obscuring rust errors
	clearScreen: false,

	// tauri expects a fixed port, fail if that port is not available
	server: {
		port: 3000,
		strictPort: true,
	},

	// to make use of `TAURI_DEBUG` and other env variables
	// https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
	envPrefix: ['VITE_', 'TAURI_'],

	build: {
		target: ['es2021', 'chrome100', 'safari13'], // Tauri supports es2021

		// don't minify for debug builds
		//		minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
		minify: process.env.VITE_NODE_ENV === 'production' ? 'esbuild' : false,

		sourcemap: !!process.env.TAURI_DEBUG, // produce sourcemaps for debug builds
	},

	resolve: {
		alias: {
			// 别名配置
			'@': resolve(__dirname, 'src'),
		},
	},

	// 打包目录
	base: './',
})
