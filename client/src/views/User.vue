<template>
  <h1>User</h1>
  <el-button @click="logout">登出</el-button>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'User',
  setup() {
    const store = useStore();
    const router = useRouter();
    const logout = () => {
      store.dispatch('logout')
        .then(() => router.push({ path: '/' }));
    };
    return {
      logout,
    };
  },
};
</script>
