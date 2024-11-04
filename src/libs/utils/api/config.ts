import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import router from "@/router";
import { Forbidden, Unauthorized } from ".";

const API_URL = import.meta.env.VITE_API_URL;

const request = axios.create({
  baseURL: API_URL,
});

// Lấy và thiết lập token từ cookie khi khởi tạo
function setAuthToken() {
  const accessToken = Cookies.get("accessToken");
  if (accessToken) {
    request.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
}

// Hàm làm mới token
async function refreshToken() {
  try {
    const refreshToken = Cookies.get("refreshToken");

    if(refreshToken){
      // Đặt refresh token tạm thời
    request.defaults.headers.common["Authorization"] = `Bearer ${refreshToken}`;
    const response = await request.post("auth/refreshToken");
    const newAccessToken = response.data.data.accessToken;
    // Lưu token mới vào cookie và cập nhật Authorization header
    Cookies.set("accessToken", newAccessToken);
    return newAccessToken;
    }
  } catch (error) {
    handleTokenError(error);
  }
}

// Hàm xử lý lỗi token
function handleTokenError(error: unknown) {
  if (error instanceof AxiosError) {
    if (error.response?.status == Unauthorized) {
      router.push("/auth/login");
    }
    console.error("Error refreshing token:", error);
  }
}

// Interceptor phản hồi
request.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Xử lý trường hợp token hết hạn
    if (error.response?.status == Unauthorized && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshToken(); // Làm mới token

      // Cập nhật token mới trong headers của originalRequest
      if (newAccessToken) {
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
      }

      return request(originalRequest); // Thực hiện lại yêu cầu gốc với token mới
    }

    // Xử lý trường hợp không có token hoặc lỗi 401
    if (error.response?.status === Unauthorized) {
      router.push("/auth/login");
    }

    // Xử lý trường hợp không có token hoặc lỗi 403
    if (error.response?.status === Forbidden) {
      router.push("/403");
    }

    return Promise.reject(error);
  }
);

// Thiết lập token khi khởi tạo
setAuthToken();

export { request };
