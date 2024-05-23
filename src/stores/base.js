import { defineStore } from 'pinia';

export const useBaseStore = defineStore('base', {
  state: () => ({
    isLoggedIn: false,
    isAdmin: false,
    baseUrl: 'http://localhost:8090'
  }),
  actions: {
    login(loginId) {
      this.isLoggedIn = true;
      this.isAdmin = loginId === 'admin';
      sessionStorage.setItem('logined', 'true');
      sessionStorage.setItem('isAdmin', this.isAdmin);
    },
    logout() {
      this.isLoggedIn = false;
      this.isAdmin = false;
      sessionStorage.setItem('logined', 'false');
      sessionStorage.setItem('isAdmin', 'false');
    }
  }
});