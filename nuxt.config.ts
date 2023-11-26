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
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp",
      },
    ],
  },
});
