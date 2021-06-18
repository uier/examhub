<template>
  <p>Hi! {{ user.name }}, your id is {{ user.userId }}</p>
  <button
    type="button"
    class="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
    @click="logout"
  >
    登出
  </button>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../store';
import { ActionTypes } from '../store/types';

export default defineComponent({
  name: 'User',
  setup() {
    const store = useStore();
    const router = useRouter();
    const { user } = store.state;
    const logout = () => {
      store.dispatch(ActionTypes.LOGOUT)
      router.push('/');
    };
    return {
      user,
      logout,
    };
  },
});
</script>
