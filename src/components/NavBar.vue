<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><a>Item 1</a></li>
          <li>
            <a>Parent</a>
            <ul class="p-2">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </li>
          <li><a>Item 3</a></li>
        </ul>
      </div>
      <RouterLink to="/" class="btn btn-ghost text-xl">Popups</RouterLink>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a>Item 1</a></li>
        <li>
          <details>
            <summary>Parent</summary>
            <ul class="p-2">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </details>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <div class="navbar-end">
      <RouterLink to="/login" v-if="!logined" class="btn">Login</RouterLink>
      <RouterLink to="/" v-else @click="logoutRequest()" class="btn">Logout</RouterLink>
    </div>
    <div>
      <RouterLink to="/signup" v-if="!logined" class="btn">SignUp</RouterLink>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import { useBaseStore } from '../stores/base';
import { computed } from 'vue';

const baseStore = useBaseStore;
var baseUrl = baseStore.baseUrl;

export default {
  name: "NavBar",
  setup() {
    const baseStore = useBaseStore();

    const logined = computed(() => baseStore.isLoggedIn);

    const logoutRequest = async () => {
      await fetch(`${baseUrl}/member/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      baseStore.logout(); // 로그아웃 후 스토어 상태 업데이트
    };

    return {
      logined,
      logoutRequest,
    };
  },
  created() {
    const baseStore = useBaseStore();
    const isLoggedIn = localStorage.getItem('logined') === 'true';

    baseStore.logined = isLoggedIn;
  },
  components: { RouterLink },
};
</script>