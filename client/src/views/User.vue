<template>
  <h1>User</h1>
  <p>Hi! {{ user.name }}, your id is {{ user.userId }}</p>
  <el-button @click="logout">登出</el-button>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/types';

export default {
  name: 'User',
  setup() {
    const store = useStore();
    const router = useRouter();
    const { user } = store.state;
    const logout = () => {
      store.dispatch(ActionTypes.LOGOUT)
        .then(() => router.push({ path: '/' }));
    };
    return {
      user,
      logout,
    };
  },
};
</script>
