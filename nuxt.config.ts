// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  
  app: {
    head: {
      title: 'Kartel', // default fallback title
      meta: [
        {
          name: 'description',
          content: 'Agence Kartel est une association dédiée à l\'exploration dynamique de la culture sous toutes ses formes'
        }
      ],
      htmlAttrs: {
        lang: 'fr',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    }
  },
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