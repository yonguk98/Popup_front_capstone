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
            <button type="submit" class="btn dark:btn-primary hover:btn-primary dark:hover:btn-ghost mt-3">Sign
              in</button>
          </div>
          <div class="flex flex-col m-5 items-center">
            <span class="text-center text-opacity-30"> ----- 처음 이용하시나요? ----- </span>
            <RouterLink to="/signup" class="btn dark:btn-primary hover:btn-primary dark:hover:btn-ghost mt-3 w-6/12">Sign
              up</RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useBaseStore } from '../stores/base';
import jwtDecode from 'jwt-decode';

const baseStore = useBaseStore();
var baseUrl = "http://localhost:8090"
//var baseUrl = baseStore.baseUrl;

export default {
  name: "LoginPage",
  data() {
    return {
      loginData: {
        loginId: "",
        password: ""
      },
      dataCheck: {
        loginId: false,
        password: false
      },
      userInfo: "",
    }
  },
  watch: {
    'loginData.loginId': function () {
      this.loginIdCheck()
    },
    'loginData.password': function () {
      this.passwordCheck()
    }
  },
  methods: {
    async loginRequest() {

      if (this.checkAll()) {
        await fetch(`${baseUrl}/member/login`, {
          method: 'post',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.loginData)
        }).then(res => {
          return res.json();
        }).then(json => {
          this.decodeToken(json);
          if (json.msg) alert(json.msg);
          if (json.statusCode == "200") {
            this.$router.push("/")
          }
        }).catch(
          () => {
            alert("로그인이 실패하였습니다.")
            this.$router.push("/login")
          }
        )
      } else {
        alert(this.findFalse() + " 항목을 다시 입력해주세요");
      }
    },
    loginIdCheck() {
      if (this.loginData.loginId.length > 3) {
        this.dataCheck.loginId = true;
      } else {
        this.dataCheck.loginId = false;
      }
    },
    passwordCheck() {
      if (this.loginData.password.length > 3) {
        this.dataCheck.password = true;
      } else {
        this.dataCheck.password = false;
      }
    },
    checkAll() {
      return Object.values(this.dataCheck).every(x => x === true);
    },
    findFalse() {
      const nameMapping = {
        loginId: ' 아이디',
        password: ' 비밀번호'
      };
      const falseEntries = Object.entries(this.dataCheck).filter(([key, value]) => value === false);
      const falseKeys = falseEntries.map(([key]) => nameMapping[key] || key);
      return falseKeys;
    },
    decodeToken(json) {
      const token = json.data.accessToken;
      if (token) {
        this.userInfo = jwtDecode(token);
        
        baseStore.login(this.userInfo.data.loginId, this.userInfo.data.id);
        // baseStore.loginId = this.userInfo.data.loginId;
        // baseStore.id = this.userInfo.data.id;
        // baseStore.logined = true

      } else {
        console.error('No JWT token found in cookies');
      }
    },
  }
}
</script>