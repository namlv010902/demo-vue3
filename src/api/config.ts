import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import router from "@/router";

const API_URL = "http://localhost:5000/api/";

const request = axios.create({
  baseURL: API_URL,
  // withCredentials: true,
});

async function refreshToken() {
  try {
    const response = await request.post("auth/refreshToken");
    const accessToken = response.data.accessToken;
    console.log("Refreshed accessToken:", accessToken);
    //
    Cookies.set("accessToken", accessToken);
    request.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error?.response?.data?.message === "Refresh token has expired") {
        router.push("/auth/login");
      }
      console.error("Error refreshing token:", error);
    }
  }
}

// Request Interceptor
request.interceptors.request.use((config) => {
  config.headers["X-Request-Timestamp"] = new Date().toISOString();
  const accessToken = Cookies.get("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

// Response Interceptor
request.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.data?.message === "Token expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      await refreshToken();
      return request(originalRequest);
    }

    if (error.response?.data?.message === "No token provided") {
      console.log(error.response?.data?.message);
      router.push("/auth/login");
    }

    return Promise.reject(error);
  }
);

export default request;
