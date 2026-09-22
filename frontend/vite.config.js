import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true // Activa el modo de prueba PWA en localhost
      },
      manifest: {
        name: 'ERP TexCore',
        short_name: 'TexCore',
        description: 'Gestión de Inventario y Kardex Textil',
        theme_color: '#10b981', // Color esmeralda corporativo
        background_color: '#f9fafb',
        display: 'standalone',
        icons: [
          {
            src: '/vite.svg', // Ícono temporal por defecto
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: '/vite.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ],
})