<template>
  <h1>login</h1>
  <el-button type="text" @click="handleClick">
    <img src="@/assets/btn_google_signin.png" class="login-button-img" />
  </el-button>
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
