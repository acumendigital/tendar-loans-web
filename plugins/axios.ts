import axios from "axios";

export default defineNuxtPlugin((NuxtApp) => {
  axios.defaults.baseURL = "https://low-code-api.fly.dev/api/v1/";
  // axios.defaults.withCredentials = true;
  const tokenStore = useStore();
  const token = tokenStore.token;
  const apiToken = tokenStore.apiToken;
  axios.interceptors.request.use((config) => {
    console.log("Token", token);
    console.log("APIToken", apiToken);
    config.headers["Authorization"] = `Bearer ${token}`;
    config.headers["x-api-token"] = `${apiToken}`;
    console.log(config);
    return config;
  });
  axios.interceptors.response.use(
    (response) => {
      console.log(response);
      return response;
    },
    (error) => {
      // console.log(error);
      const parsedError = error.response?.data?.message || error.message;
      const status = error.response?.data?.code;
      if (
        parsedError?.toLowerCase().includes("session expired") ||
        parsedError?.toLowerCase().includes("invalid signature") ||
        parsedError?.toLowerCase().includes("Invalid api token") ||
        status === 401
      ) {
        if (!window.location.pathname.includes("/auth/login")) {
          console.log(parsedError);
          location.replace(`/auth/login?fallBackUrl=${window.location.pathname}`);
          // redirect(`/auth/login?fallBackUrl=${window.location.pathname}`);
        }
      }
      console.log(error);
      return Promise.reject(error);
    }
  );
  return {
    provide: {
      axios: axios,
    },
  };
});
