import instance from '@/api/config';
import Cookies from 'js-cookie';
import { toast } from 'vue3-toastify';

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
  async login({ commit }: { commit: Function }, payload: IPayload): Promise<boolean> {
    try {
      const { data } = await instance.post<IResponse>('/auth/login', payload);

      if (data && data.data) {
        const { accessToken, user, refreshToken } = data.data;

        // Commit user data and tokens to the Vuex store
        commit('setUser', user);
        commit('setToken', accessToken);

        // Save tokens to cookies
        Cookies.set('accessToken', accessToken);
        Cookies.set('refreshToken', refreshToken);

        return true; 
      } else {
        
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  async getMe ({commit}){
    try {
      const accessToken = Cookies.get('accessToken');

      if (accessToken) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        const { data } = await instance.get<IResponse>('/auth/me');

        if (data && data.data) {
          const { user } = data.data;
          commit('setUser', user);
          return true;
        } else {
          toast.error('Failed to get user information');
        }
      } else {
        toast.error('Failed to authenticate user');
      }
    } catch (error) {
      console.error('GetMe error:', error);
      throw error;
    }
  }
};
