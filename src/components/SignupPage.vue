<template>
    <div class="container my-4 space-y-4">
        <div class="pl-10 pr-10">
            <div class="flex flex-col mb-5">
                <h2 class="text-3xl font-bold border-bottom py-2 m-5 text-center dark:text-primary">
                    회원가입
                </h2>
                <form @submit.prevent="requestSignup" method="post">
                    <div class="flex flex-col m-5">
                        <label for="username" class="form-label">아이디</label>
                        <input
                            class="input input-bordered dark:input-primary bg-gray-light dark:bg-gray-dark mt-3 max-w-full"
                            name="username" id="username" type="text" placeholder="아이디를 입력해주세요."
                            v-model="signupData.loginId" />
                    </div>
                    <div class="flex flex-col m-5">
                        <label for="password1" class="form-label">비밀번호</label>
                        <input
                            class="input input-bordered dark:input-primary bg-gray-light dark:bg-gray-dark mt-3 max-w-full"
                            name="loginPassword1" id="loginPassword1" type="password" placeholder="비밀번호를 입력해주세요."
                            v-model="signupData.loginPassword1" />
                    </div>
                    <div class="flex flex-col m-5">
                        <label for="passwordCheck" class="form-label">비밀번호 확인</label>
                        <input
                            class="input input-bordered dark:input-primary bg-gray-light dark:bg-gray-dark mt-3 max-w-full"
                            name="loginPassword2" id="loginPassword2" type="password" placeholder="비밀번호를 재입력해주세요."
                            v-model="signupData.loginPassword2" />
                    </div>
                    <div class="flex flex-col m-5">
                        <label for="nickname" class="form-label">닉네임</label>
                        <input
                            class="input input-bordered dark:input-primary bg-gray-light dark:bg-gray-dark mt-3 max-w-full"
                            name="nickname" id="nickname" type="text" placeholder="닉네임를 입력해주세요."
                            v-model="signupData.nickname" />
                    </div>
                    <div class="flex flex-col m-5">
                        <label for="email" class="form-label">이메일</label>
                        <input
                            class="input input-bordered dark:input-primary bg-gray-light dark:bg-gray-dark mt-3 max-w-full"
                            name="email" id="email" type="email" placeholder="이메일을 입력해주세요." v-model="signupData.email" />
                    </div>
                    <div class="flex flex-col m-5">
                        <button type="submit"
                            class="btn dark:btn-primary hover:btn-primary dark:hover:btn-ghost mt-3">회원가입</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { useBaseStore } from '../stores/base';

const baseStore = useBaseStore();
var baseUrl = "http://localhost:8090"//baseStore.baseUrl;

export default {
    name: "SignupPage",
    data() {
        return {
            signupData: {
                loginId: "",
                loginPassword1: "",
                loginPassword2: "",
                email: "",
                nickname: ""
            },
            dataCheck: {
                loginId: false,
                loginPassword1: false,
                loginPassword2: false,
                email: false,
                nickname: false
            }
        }
    },
    watch: {
        'signupData.loginId': function () {
            this.loginIdCheck()
        },
        'signupData.loginPassword1': function () {
            this.loginPassword1Check()
        },
        'signupData.loginPassword2': function () {
            this.loginPassword2Check()
        },
        'signupData.email': function () {
            this.emailCheck()
        },
        'signupData.nickname': function () {
            this.nicknameCheck()
        }
    },
    methods: {
        async requestSignup() {

            if (this.checkAll()) {
                await fetch(`${baseUrl}/member/create`, {
                    method: 'post',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.signupData)
                }
                ).then(response => {
                    return response.json();
                }
                ).then(json => {
                    if (json.message) alert(json.message);
                    if (json.msg) alert(json.msg);
                    if (json.statusCode == "200") {
                        this.$router.push("/login")
                    }
                }
                ).catch(
                    () => {
                        alert("회원가입이 실패하였습니다.")
                        this.$router.push("/signup")
                    }
                );
            } else {
                alert(this.findFalse() + " 항목을 다시 입력해주세요");
            }
        },
        loginIdCheck() {
            if (this.signupData.loginId.length > 3) {
                this.dataCheck.loginId = true
            } else {
                this.dataCheck.loginId = false
            }
        },
        loginPassword1Check() {
            if (this.signupData.loginPassword1.length > 3) {
                this.dataCheck.loginPassword1 = true
            } else {
                this.dataCheck.loginPassword1 = false
            }
        },
        loginPassword2Check() {
            if (this.signupData.loginPassword1 == this.signupData.loginPassword2) {
                this.dataCheck.loginPassword2 = true;
            } else {
                this.dataCheck.loginPassword2 = false;
            }
        },
        emailCheck() {
            const validateId = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
            if (!validateId.test(this.signupData.email) || !this.signupData.email) {
                this.dataCheck.email = false
            } else {
                this.dataCheck.email = true
            }
        },
        nicknameCheck() {
            if (this.signupData.nickname.length > 3) {
                this.dataCheck.nickname = true
            } else {
                this.dataCheck.nickname = false
            }
        },
        checkAll() {
            return Object.values(this.dataCheck).every(x => x === true);
        },
        findFalse() {
            const nameMapping = {
                loginId: ' 아이디',
                loginPassword1: ' 비밀번호',
                loginPassword2: ' 비밀번호 확인',
                nickname: " 닉네임",
                email: " 이메일"
            };
            const falseEntries = Object.entries(this.dataCheck).filter(([key, value]) => value === false);
            const falseKeys = falseEntries.map(([key]) => nameMapping[key] || key);
            return falseKeys;
        }
    },
}

</script>