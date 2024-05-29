import { defineStore } from 'pinia';

export const useBaseStore = defineStore('base', {
  state: () => ({
    isLoggedIn: false,
    isAdmin: false,
    // baseUrl: 'https://yonguk.shop'
    baseUrl: 'http://localhost:8090'
  }),
  actions: {
    login(loginId, userId, accessToken, refreshToken) {
      this.isLoggedIn = true;
      this.isAdmin = loginId === 'admin';
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("loginId", loginId);
      sessionStorage.setItem('logined', 'true');
      sessionStorage.setItem('isAdmin', this.isAdmin);
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);
    },
    logout() {
      this.isLoggedIn = false;
      this.isAdmin = false;
      sessionStorage.clear();
      sessionStorage.setItem('logined', false);

    },
    getIsLoggedIn(){
        return this.isLoggedIn;
    }
  }
});