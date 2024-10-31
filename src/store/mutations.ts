export default {
    setUser(state: { user: any; }, user: any) {
      state.user = user;
    },
    setToken(state: { token: string; }, token: string) {
      state.token = token;
    },
  };
  