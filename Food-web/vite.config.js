import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev
export default defineConfig({
  plugins: [vue()],
  base: '/WCT-FINAL-PROJECT/' // 👈 ត្រូវដូរមកដាក់បែបនេះ ដើម្បីឱ្យវាស្គាល់ទាំងឈ្មោះ Repository និង Folder ខាងក្នុង
})
