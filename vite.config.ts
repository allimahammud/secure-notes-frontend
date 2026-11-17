import { defineConfig } from 'vite'; 
import react from '@vitejs/plugin-react'; 
//local
//export default defineConfig({ plugins: [react()] });
//vite
export default defineConfig({
  plugins: [react()],
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: ['secure-notes-frontend-f6rm.onrender.com'],
  },
});
