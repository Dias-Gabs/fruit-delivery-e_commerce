import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Habilita acesso via rede
    port: 9080 // Ou qualquer porta que preferir
  }
})
