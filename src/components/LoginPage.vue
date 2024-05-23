<template>
  <div class="container my-4 space-y-4">
    <div class="pl-10 pr-10">
      <div class="flex flex-col">
        <h3 class="text-2xl font-bold border-bottom py-2 m-5 text-left dark:text-primary">Popups Sign in</h3>
        <form @submit.prevent="loginRequest" method="post">
          <div class="flex flex-col m-5">
            <label class="form-label">아이디</label>
            <input class="input input-bordered dark:input-primary bg-gray-light dark:bg-gray-dark mt-3 max-w-full"
              name="loginId" id="loginId" type="text" placeholder="아이디를 입력해주세요." v-model="loginData.loginId" />
          </div>
          <div class="flex flex-col m-5">
            <label for="password" class="form-label">비밀번호</label>
            <input class="input input-bordered dark:input-primary bg-gray-light dark:bg-gray-dark mt-3 max-w-full"
              name="password" id="password" type="password" placeholder="비밀번호를 입력해주세요." v-model="loginData.password" />
          </div>
          <div class="flex flex-col m-5">
            <button type="submit" class="btn dark:btn-primary hover:btn-primary dark:hover:btn-ghost mt-3">Sign in</button>
          </div>
          <div class="flex flex-col m-5 items-center">
            <span class="text-center text-opacity-30"> ----- 처음 이용하시나요? ----- </span>
            <RouterLink to="/signup" class="btn dark:btn-primary hover:btn-primary dark:hover:btn-ghost mt-3 w-6/12">Sign up</RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useBaseStore } from '../stores/base';
import jwtDecode from 'jwt-decode';
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: "LoginPage",
  setup() {
    const baseStore = useBaseStore();
    const router = useRouter();
    
    const loginData = ref({ loginId: "", password: "" });
    const dataCheck = ref({ loginId: false, password: false });
    const userInfo = ref("");

    const baseUrl = computed(() => baseStore.baseUrl);
    const logined = computed(() => baseStore.isLoggedIn);

    watch(() => loginData.value.loginId, loginIdCheck);
    watch(() => loginData.value.password, passwordCheck);

    function loginIdCheck() {
      dataCheck.value.loginId = loginData.value.loginId.length > 3;
    }

    function passwordCheck() {
      dataCheck.value.password = loginData.value.password.length > 3;
    }

    function checkAll() {
      return Object.values(dataCheck.value).every(x => x);
    }

    function findFalse() {
      const nameMapping = {
        loginId: ' 아이디',
        password: ' 비밀번호'
      };
      return Object.entries(dataCheck.value)
        .filter(([key, value]) => !value)
        .map(([key]) => nameMapping[key])
        .join(', ');
    }

    async function loginRequest() {
      if (checkAll()) {
        try {
          const response = await fetch(`${baseUrl.value}/member/login`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData.value)
          });
          const json = await response.json();
          decodeToken(json);
          if (json.msg) alert(json.msg);
          if (json.statusCode == "200") {
            router.push("/");
          }
        } catch (error) {
          alert("로그인이 실패하였습니다.");
          router.push("/login");
        }
      } else {
        alert(findFalse() + " 항목을 다시 입력해주세요");
      }
    }

    function decodeToken(json) {
      const token = json.data.accessToken;
      if (token) {
        userInfo.value = jwtDecode(token);
        baseStore.login(userInfo.value.data.loginId);
      } else {
        console.error('No JWT token found in response');
      }
    }

    return {
      loginData,
      dataCheck,
      loginRequest,
      logined,
    };
  },
  created() {
    sessionStorage.clear();
  }
}
</script>
