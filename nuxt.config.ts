// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/image'],
  image: {
    domains: ['fastly.picsum.photos'],
    format: ['avif', 'webp'],
  },
  routeRules: {
    '/gallery': { prerender: true },
    '/api/gallery': { prerender: true },
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Frontend Coding Challenge',
      htmlAttrs: { lang: 'en' },
    },
  },
  nitro: {
    storage: {
      storage: {
        driver: 'fs',
        base: './storage',
      },
    },
  },
});
