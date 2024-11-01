import router from '@/router';
import Cookies from 'js-cookie';

const useLogOut = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    router.push("/auth/login");

};

export default useLogOut; 
