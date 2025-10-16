// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({
    // SPA mode for testing
    ssr: false,
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},

    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        '@vueuse/nuxt'
    ],

    runtimeConfig: {
        public: {
            apiBase: process.env.API_BASE_URL || 'http://localhost:8080'
        }
    },

    app: {
        head: {
            title: 'Diablo III API Tester',
            meta: [
                {charset: 'utf-8'},
                {name: 'viewport', content: 'width=device-width, initial-scale=1'}
            ]
        }
    },

    css: ['~/assets/css/main.css'],

    devServer: {
        port: 3000
    }
})