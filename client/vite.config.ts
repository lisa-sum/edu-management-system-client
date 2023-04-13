import {resolve} from 'node:path'

import basicSSL from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react-swc'
import {defineConfig, UserConfig} from 'vite'

// 公共配置
const publicConfig: UserConfig = {
  // to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ['VITE_', 'TAURI_'],

  resolve: {
    alias: {
      // 别名配置
      '@': resolve(__dirname, 'src'),
    },
  },

  // Vite options tailored for Tauri development and only applied in `tauri
  // dev` or `tauri build` prevent vite from obscuring rust errors
  clearScreen: false,
  // 打包目录
  base: './',
}

// 开发模式配置
const developmentConfig: UserConfig = {
  plugins: [react()],

  server: {
    port: 3000,
    strictPort: true,
  },

  build: {
    target: ['es2021', 'chrome105', 'safari13'], // Tauri supports es2021

    // don't minify for debug builds
    // minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    minify: process.env.VITE_NODE_ENV === 'production' ? 'esbuild' : false,
    // 为调试构建生成源代码映射 (sourcemap)
    sourcemap: !!process.env.TAURI_DEBUG,

    outDir: 'dist-dev',
  },
}

// 测试环境配置
const testConfig: UserConfig = {
  plugins: [react(), basicSSL()],
  server: {
    port: 443,
    strictPort: true,
  },
  build: {
    target: ['es2021', 'chrome105', 'safari13'], // Tauri supports es2021

    // don't minify for debug builds
    // minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    minify: process.env.VITE_NODE_ENV === 'production' ? 'esbuild' : false,
    // 为调试构建生成源代码映射 (sourcemap)
    sourcemap: !!process.env.TAURI_DEBUG,

    outDir: 'dist-test',
  },
}

// 生产模式配置
const productionConfig: UserConfig = {
  plugins: [react()],

  // Vite options tailored for Tauri development and only applied in `tauri
  // dev` or `tauri build` prevent vite from obscuring rust errors
  clearScreen: false,

  // tauri expects a fixed port, fail if that port is not available
  server: {
    host: '0.0.0.0',
    port: 443,
    strictPort: true,
  },

  build: {
    target: ['es2021', 'chrome105', 'safari13'], // Tauri supports es2021

    // don't minify for debug builds
    // minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    minify: process.env.VITE_NODE_ENV === 'production' ? 'esbuild' : false,
    // 为调试构建生成源代码映射 (sourcemap)
    sourcemap: !!process.env.TAURI_DEBUG,

    outDir: 'dist',
  },
}

// https://vitejs.dev/config/
export default defineConfig(({mode}): UserConfig => {
  switch (mode) {
    case 'production':
      return {...publicConfig, ...productionConfig}
    case 'development':
      return {...publicConfig, ...developmentConfig}
    case 'test':
      return {...publicConfig, ...testConfig}
    default:
      throw new Error('请设置环境变量')
  }
})
