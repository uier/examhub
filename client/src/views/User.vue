<template>
  <div class="min-h-4/5 flex items-center justify-center py-12 px-4">
    <div class="mt-6 flex flex-col">
      <p class="my-2">Username: {{ user.name }}</p>
      <p class="my-2">User ID: {{ user.userId }}</p>
      <p class="my-2">Role: {{ ROLE[user.role] }}</p>
      <button
        type="button"
        class="px-4 py-2 mt-20 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        @click="logout"
      >
        登出
      </button>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../store';
import { ActionTypes } from '../store/types';

const ROLE = ['ADMIN', 'EDITOR', 'USER'];

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
      ROLE,
    };
  },
});
</script>
