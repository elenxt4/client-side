// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  // SPA mode for testing
  ssr: false,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    ['@primevue/nuxt-module', {
      options: {
        ripple: true,
        theme: {
          preset: 'Aura',
          options: {
            darkModeSelector: '.dark-mode',
            cssLayer: {
              name: 'primevue',
              order: 'tailwind-base, primevue, tailwind-utilities'
            }
          }
        }
      }
    }]
  ],

  runtimeConfig: {
    public: {
      apiBase: (globalThis as any).process?.env?.API_BASE_URL || 'http://localhost:8080'
    }
  },

  app: {
    head: {
      title: 'Diablo III API Tester',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },

  css: [
    'primeicons/primeicons.css',
    '~/assets/css/main.css',
    '~/assets/css/primevue-overrides.css'
  ],

  devServer: {
    port: 3000
  }
})
