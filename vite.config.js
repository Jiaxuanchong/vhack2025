import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),react()
  ],
    server: {
    proxy: {
      // Proxy any request starting with /bitcoin-news-sentiment
       '/bitcoin-news-sentiment': {
        target: 'http://localhost:8001',
        changeOrigin: true,
        secure: false
        },
        'api/v1/backtest/simulate-trade': {
          target: 'http://localhost:8000',
          changeOrigin: true,
          secure: false,
        },
        
      }
  },
  },)
