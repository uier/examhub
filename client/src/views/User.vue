<template>
  <div class="min-h-4/5 flex items-center justify-center py-12 px-4">
    <div class="mt-6 flex flex-col">
      <div class="text-lg text-center">帳號資訊</div>
      <p class="mt-10 my-2">Username: {{ user.name }}</p>
      <p class="my-2">User ID: {{ user.userId }}</p>
      <p class="my-2">Role: {{ ROLE[user.role] }}</p>
      <button
        type="button"
        class="px-4 py-2 mt-10 font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        @click="logout"
      >
        登出
      </button>

      <div class="mt-20">
        <div class="text-lg text-center">🔥 Demo 專屬功能 🔥</div>
        <div class="mt-2 flex items-center">
          目前角色：
          <select
            v-model="transRole"
            name="select-course"
            class="mx-2 h-8 p-1 border border-gray-500 rounded"
          >
            <option
              v-for="(role, index) in ROLE"
              :key="role"
              :value="index"
            >{{ role }}</option>
          </select>
          <button
            type="button"
            class="px-4 py-2 font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            @click="transform"
          >
            <span class="text-xl">🔮</span> 魔法變身
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';
import { useStore } from '../store';
import { ActionTypes } from '../store/types';

const ROLE = ['ADMIN', 'EDITOR', 'USER'];

export default defineComponent({
  name: 'User',
  setup() {
    const store = useStore();
    const router = useRouter();
    const { user } = store.state;
    const transRole = ref(user?.role);
    return {
      user,
      ROLE,
      logout() {
        store.dispatch(ActionTypes.LOGOUT)
        router.push('/');
      },
      transRole,
      transform() {
        if (!user) return;
        api.Users.modify(user.userId, {
          role: transRole.value,
          name: user.name,
        }).then(() => {
          alert('霹靂卡霹靂拉拉波波莉娜貝貝魯多');
          router.go(0);
        }).catch(() => alert('ㄨㄚˊ 變身失敗ㄌ'));
      }
    };
  },
});
</script>
