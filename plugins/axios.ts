import axios from "axios";
import { useUserStore } from "@/stores/index";

export default defineNuxtPlugin((NuxtApp) => {
  axios.defaults.baseURL = "https://low-code-api.fly.dev/api/v1/";
  const dataStore = useUserStore();
  axios.interceptors.request.use((config) => {
    config.headers["Authorization"] = `Bearer ${dataStore.token}`;
    config.headers["x-api-token"] = `${dataStore.apiToken}`;
    return config;
  });
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const parsedError = error.response?.data?.message || error.message;
      const status = error.response?.data?.code;
      if (
        parsedError?.toLowerCase().includes("session expired") ||
        parsedError?.toLowerCase().includes("invalid signature") ||
        parsedError?.toLowerCase().includes("Invalid api token") ||
        status === 401
      ) {
        if (!window.location.pathname.includes("/auth/login")) {
          location.replace(`/auth/login?fallBackUrl=${window.location.pathname}`);
        }
      }
      return Promise.reject(error);
    }
  );
  return {
    provide: {
      axios: axios,
    },
  };
});
