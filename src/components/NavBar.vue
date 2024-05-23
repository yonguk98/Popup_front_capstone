<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
      </div>
      <RouterLink to="/" class="btn btn-ghost text-xl">Popups</RouterLink>
    </div>
    <div class="navbar-end">
      <RouterLink to="/login" v-if="!logined" class="btn">Login</RouterLink>
      <RouterLink to="/" v-else @click="logoutRequest()" class="btn">Logout</RouterLink>
    </div>
    <div>
      <RouterLink to="/signup" v-if="!logined" class="btn">SignUp</RouterLink>
      <RouterLink to="/admin" v-if="isAdmin" class="btn">Admin</RouterLink>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import { useBaseStore } from '../stores/base';
import { computed } from 'vue';

export default {
  name: "NavBar",
  setup() {
    const baseStore = useBaseStore();

    const logined = computed(() => baseStore.isLoggedIn);
    const isAdmin = computed(() => baseStore.isAdmin);

    const logoutRequest = async () => {
      await fetch(`${baseStore.baseUrl}/member/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      baseStore.logout(); // 로그아웃 후 스토어 상태 업데이트
      sessionStorage.clear(); 
    };

    return {
      logined,
      isAdmin,
      logoutRequest,
    };
  },
  created() {
    const baseStore = useBaseStore();
    const isLoggedIn = sessionStorage.getItem('logined') === 'true';
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';

    if (isLoggedIn) {
      baseStore.isLoggedIn = isLoggedIn;
      baseStore.isAdmin = isAdmin;
    } else {
      sessionStorage.clear(); // 로컬 스토리지 초기화
    }
  },
  components: { RouterLink },
};
</script>
