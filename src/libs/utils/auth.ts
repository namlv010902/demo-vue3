import Cookies from "js-cookie";
import { instance } from "./api";
import router from "@/router";

const setToken = (accesstoken: string, refreshToken?: string) => {
  Cookies.set("accessToken", accesstoken);
  if (refreshToken) Cookies.set("refreshToken", refreshToken);
  // Update axios headers with the access token
  instance.defaults.headers.common["Authorization"] = `Bearer ${accesstoken}`;
};

const removeToken = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  // Remove the Authorization header from axios
  delete instance.defaults.headers.common["Authorization"];
};

const getToken = () => {
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");
  return {
    accessToken,
    refreshToken,
  };
};

const logout =()=>{
    removeToken();
    router.push("/auth/login");
}

export { setToken, removeToken, getToken,logout };
