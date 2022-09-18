import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

const __dirname = path.resolve()

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src', 'components'),
      },
    ],
  },
  plugins: [react()],
})
