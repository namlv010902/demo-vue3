import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import router from "@/router";
import { Unauthorized, Forbidden } from "@/libs/shared/constants";
import { APIQueryKey } from "./vue-query";
import { logout } from "../auth";

const API_URL = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: API_URL,
});

const refreshInstance = axios.create({
  baseURL: API_URL, // Same base URL but no interceptors attached
});

// Initial token setup
function setAuthToken() {
  const accessToken = Cookies.get("accessToken");
  if (accessToken) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
}

// Refresh token function using `refreshInstance`
async function refreshToken() {
  try {
    const refreshToken = Cookies.get("refreshToken");

    if (refreshToken) {
      const response = await refreshInstance.post(APIQueryKey.REFRESH_TOKEN, null, {
        headers: { Authorization: `Bearer ${refreshToken}` },
      });

      const newAccessToken = response.data.data.accessToken;
      Cookies.set("accessToken", newAccessToken);
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newAccessToken}`;
      return newAccessToken;
    }
  } catch (error) {
    handleTokenError(error);
    throw error; // Re-throw to ensure any awaiting calls stop execution
  }
}

// Error handling function for unauthorized access
function handleTokenError(error: unknown) {
  if (error instanceof AxiosError && error.response?.status === Unauthorized) {
    logout();
  }
}

// Interceptor to handle token expiration and retries
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle token expiration and retry logic
    if (error.response?.status === Unauthorized && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshToken();
        if (newAccessToken && originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return instance(originalRequest); // Retry original request with new token
        }
      } catch (refreshError) {
        logout();
        return Promise.reject(refreshError);
      }
    }

    // Handle 401 and 403 errors
    if (error.response?.status === Unauthorized) {
      logout();
    } else if (error.response?.status === Forbidden) {
      router.push("/403");
    }

    return Promise.reject(error);
  }
);

// Set token on app startup
setAuthToken();

export { instance };
