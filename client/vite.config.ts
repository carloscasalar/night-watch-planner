import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/night-watch-planner/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/common/components'),
      '@format': path.resolve(__dirname, './src/common/format'),
      '@http': path.resolve(__dirname, './src/common/http'),
      '@mappers': path.resolve(__dirname, './src/common/mappers'),
      '@app': path.resolve(__dirname, './src/app'),
      '@domain': path.resolve(__dirname, './src/domain'),
      '@features': path.resolve(__dirname, './src/features'),
      '@usecases': path.resolve(__dirname, './src/usecases'),
    }
  },
  server: {
    port: 1234
  }
})
