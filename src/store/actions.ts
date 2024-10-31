import { request } from "@/api/config";
import Cookies from "js-cookie";
import { toast } from "vue3-toastify";

interface IPayload {
  email: string;
  password: string;
}

interface IResponse {
  data: {
    accessToken: string;
    user: any;
    refreshToken: string;
  };
}

export default {
  async login({ commit }: { commit: Function }, payload: IPayload) {
    try {
      const { data } = await request.post<IResponse>("/auth/login", payload);

      if (data && data.data) {
        const { accessToken, user, refreshToken } = data.data;

        // Commit user data and tokens to the Vuex store
        commit("setUser", user);
        commit("setToken", accessToken);

        // Save tokens to cookies
        Cookies.set("accessToken", accessToken);
        Cookies.set("refreshToken", refreshToken);
        request.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        return true;
      } else {
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  async getMe({ commit }) {
    try {
      const { data } = await request.get<IResponse>("/auth/me");

      if (data && data.data) {
        const { user } = data.data;
        commit("setUser", user);
        return true;
      }
    } catch (error) {
      console.error("GetMe error:", error);
      throw error;
    }
  },
};
