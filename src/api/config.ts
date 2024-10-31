import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import router from "@/router";

const API_URL = "http://localhost:5000/api/";

const request = axios.create({
  baseURL: API_URL,
});

// Lấy và thiết lập token từ cookie
function setAuthToken() {
  
  const accessToken = Cookies.get('accessToken');
  if (accessToken) {
    console.log("running...",accessToken);
    request.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
}

// Hàm làm mới token
async function refreshToken() {
  try {
    const refreshToken = Cookies.get('refreshToken');
    if (!refreshToken) {
      throw new Error("Refresh token not found");
    }
    request.defaults.headers.common["Authorization"] = `Bearer ${refreshToken}`;
    const response = await request.post("auth/refreshToken");
    const newAccessToken = response.data.data.accessToken;
    Cookies.set("accessToken", newAccessToken);
    request.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
    return newAccessToken;
  } catch (error) {
    handleTokenError(error);
  }
}

// Hàm xử lý lỗi token
function handleTokenError(error) {
  if (error instanceof AxiosError) {
    if (error.response?.data?.message === "Refresh token has expired") {
      router.push("/auth/login");
    }
    console.error("Error refreshing token:", error);
  }
}

// Interceptor yêu cầu
request.interceptors.request.use((config) => {
  config.headers["X-Request-Timestamp"] = new Date().toISOString();
  setAuthToken(); // Thiết lập token cho mỗi yêu cầu
  return config;
});

// Interceptor phản hồi
request.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Xử lý trường hợp token hết hạn
    if (
      error.response?.data?.message === "Token expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      await refreshToken(); // Làm mới token
      return request(originalRequest); // Thực hiện lại yêu cầu gốc
    }

    // Xử lý trường hợp không có token
    if (error.response?.data?.message === "No token provided") {
      console.log(error.response?.data?.message);
      router.push("/auth/login");
    }

    return Promise.reject(error);
  }
);

// Thiết lập token khi khởi tạo
setAuthToken();

export {
  request,
};
