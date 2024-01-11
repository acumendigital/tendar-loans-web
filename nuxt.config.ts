// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "~/assets/css/main.css",
    "~/assets/css/table.css",
    "~/assets/css/loaders.css",
  ],
  modules: [
    "@nuxt/ui",
    "@nuxtjs/tailwindcss",
    "maz-ui/nuxt",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
    "@pinia-plugin-persistedstate/nuxt",
  ],
  imports: {
    dirs: ["stores"],
  },
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    // and more...
  },
  app: {
    head: {
      title: "Tendar Loans",
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
      ENCRYPTION_KEY:
        process.env.ENCRYPTION_KEY ||
        "0dab2cbffc8dcf5425912baa52de7c529c67e44255f71e4b5b3c6417787a0adb",
    },
    private: {
      ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    },
  },
});
