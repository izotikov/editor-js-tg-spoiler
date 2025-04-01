import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'TgSpoilerEditorJS',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['@editorjs/editorjs']
    }
  },
  plugins: [dts({
    insertTypesEntry: true,
  })]
});
