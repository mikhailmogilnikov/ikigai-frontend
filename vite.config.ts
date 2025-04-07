import MillionLint from '@million/lint';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { lingui } from '@lingui/vite-plugin';

export default defineConfig({
  plugins: [
    MillionLint.vite({
      enabled: true,
    }),
    react({
      plugins: [['@lingui/swc-plugin', {}]],
    }),
    lingui({ configPath: './lingui.config.js' }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
});
