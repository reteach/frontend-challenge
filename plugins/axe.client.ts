// plugins/axe.client.ts
import vueAxe from "vue-axe"

export default defineNuxtPlugin((nuxtApp) => {
  // Only run in development mode to avoid leaking audits in production
  if (process.dev) {
    nuxtApp.vueApp.use(vueAxe, {
      config: {
        // Optional: Add custom axe-core configuration here
      },
    })
  }
})
