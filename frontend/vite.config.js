import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    port: 3000,
    proxy: {
      "/kampala/products": "http://localhost:4000/",
      "/kampala/users": "http://localhost:4000/",
      "/kampala/orders": "http://localhost:4000/",
    },
  },
});