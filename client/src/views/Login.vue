<template>
  <div class="min-h-4/5 flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img class="mx-auto h-16 w-auto" src="@/assets/logo.png" alt="logo">
        <h1 class="mt-10 text-center text-gray-700 text-3xl">歡迎來到師大資工考古題系統</h1>
        <h1 class="mt-4 text-center text-rose-800 text-lg">僅允許 gapps.ntnu.edu.tw 帳號登入</h1>
      </div>
      <div class="mt-6 flex justify-center">
        <button class="mx-auto" @click="handleClick">
          <img class="h-12" src="@/assets/googleSignin@2x.png" alt="google signin">
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    handleClick() {
      window.location = 'http://localhost:3000/api/auth/google';
    },
  },
};
</script>

<style scoped>
.login-button-img {
  width: 200px;
}
</style>
