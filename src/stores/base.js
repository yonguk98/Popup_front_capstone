import { defineStore } from 'pinia';

export const useBaseStore = defineStore('base',{
    state: () =>({
        baseUrl: "https://yonguk.shop",
        logined: false,
        loginId: null,
        id: null,
    }),
    actions:{
        login(userId, id) {
            this.logined = true;
            this.loginId = userId;
            this.id = id;
            localStorage.setItem('logined', 'true');
        },
        logout() {
          this.logined = false;
          this.loginId = null;
          this.id = null;
          localStorage.setItem('logined', 'false');
        },
    },
    getters:{
        isLoggedIn: (state) => state.logined,
    }
})