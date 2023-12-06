import axios from "axios";

export default defineNuxtPlugin((NuxtApp) => {
  axios.defaults.baseURL = "https://low-code-api.fly.dev/api/v1/";
  // axios.defaults.withCredentials = true;
  const tokenStore = useStore();
  const token = tokenStore.token;
  axios.interceptors.request.use((config) => {
    config.headers["Authorization"] = `Bearer ${token}`;
    console.log(config);
    return config
  })
  return {
    provide: {
      axios: axios,
    },
  };
});

