import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Adicionando alias para react-firebase-hooks
      'react-firebase-hooks': path.resolve(__dirname, 'node_modules/react-firebase-hooks'),
    },
  },
});
