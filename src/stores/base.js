import { defineStore } from 'pinia';

export const useBaseStore = defineStore('base', {
  state: () => ({
    isLoggedIn: false,
    isAdmin: false,
    baseUrl: 'https://yonguk.shop'
  }),
  actions: {
    login(loginId, userId) {
      this.isLoggedIn = true;
      this.isAdmin = loginId === 'admin';
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("loginId", loginId);
      sessionStorage.setItem('logined', 'true');
      sessionStorage.setItem('isAdmin', this.isAdmin);
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