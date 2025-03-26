// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    server: {
      fs: {
        strict: false
      },
      watch: {
        ignored: ['**/node_modules/**', '**/.nuxt/**', '**/dist/**']
      }
    }
  },
  compatibilityDate: '2024-11-01',
  modules: ['nuxt-swiper', '@nuxtjs/supabase', 'nuxt-tiptap-editor', '@nuxt/icon'],
  tiptap: {
    prefix: 'Tiptap', //prefix for Tiptap imports, composables not included
  },
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '@fortawesome/fontawesome-free/css/all.min.css'
    //'@/assets/main.scss' // Fichier custom pour tes styles
  ],
  supabase: {
    redirect: false, // evites la redirection vers la page de login
  },
  devtools: { enabled: true }
})