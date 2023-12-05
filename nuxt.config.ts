// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css", "~/assets/css/table.css"],
  modules: ["@nuxtjs/tailwindcss", "maz-ui/nuxt"],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    // and more...
  },
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL || "https://low-code-api.fly.dev/api/v1/",
      ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    },
    private: {
      ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    },
  },
});
