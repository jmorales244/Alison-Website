import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // makes Vite listen on all interfaces
    allowedHosts: [
      ".loca.lt", // allow all LocalTunnel subdomains
      "dark-bushes-wash.loca.lt",// or you can put a specific one like "dark-bushes-wash.loca.lt"
    ]
  }
})
