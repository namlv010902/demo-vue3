export default {
    isAuthenticated(state: { token: string; }) {
      return !!state.token;
    },
  };
  