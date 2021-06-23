<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4">
    <div class="flex flex-col">
      <div class="text-lg text-center">帳號資訊</div>
      <p class="mt-2 my-2">名稱: {{ user.name }}</p>
      <p class="my-2">ID: {{ user.userId }}</p>
      <p class="my-2">角色: {{ ROLE[user.role] }}</p>
      <p class="my-2">貢獻值: {{ contribution }}</p>
      <button
        type="button"
        class="px-4 py-2 mt-5 font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none"
        @click="logout"
      >
        登出
      </button>

      <div class="mt-20 text-lg text-center">🔥 Demo 專屬功能 🔥</div>
      <div class="mt-2 flex items-center">
        改變角色：
        <select
          v-model="transRole"
          name="select-course"
          class="ml-2 flex-1 h-8 p-1 border border-gray-500 rounded"
        >
          <option
            v-for="(role, index) in ROLE"
            :key="role"
            :value="index"
          >{{ role }}</option>
        </select>
      </div>
      <div class="mt-2 flex items-center">
        改變名稱：
        <text-field class="ml-2" v-model="transName" label="" />
      </div>
      <button
        type="button"
        class="mt-4 px-5 py-2 font-medium text-blue-900 bg-rose-100 border border-transparent rounded-md hover:bg-rose-200 focus:outline-none"
        @click="transform"
      >
        <span class="tex-base">🔮</span> 變身
      </button>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';
import { useStore } from '../store';
import { ActionTypes } from '../store/types';
import TextField from '../components/UI/TextField.vue';

const ROLE = ['ADMIN', 'EDITOR', 'USER'];

export default defineComponent({
  name: 'User',
  components: { TextField },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);
    const router = useRouter();
    const transRole = ref(user.value?.role);
    const transName = ref(user.value?.name);
    const contribution = ref(0);

    const fetchData = (userId: number) => {
      api.Users.get(userId)
        .then((resp) => {
          contribution.value = resp.data.contribution;
        });
    }

    watch(
      () => user.value,
      (value, prevValue) => {
        if (value) {
          fetchData(Number(value.userId));
        }
      },
      { immediate: true },
    )

    return {
      user,
      contribution,
      ROLE,
      logout() {
        store.dispatch(ActionTypes.LOGOUT)
        router.push('/');
      },
      transRole,
      transName,
      transform() {
        if (!user.value) return;
        api.Users.modify(user.value.userId, {
          role: transRole.value,
          name: transName.value,
        }).then(() => {
          alert('霹靂卡霹靂拉拉波波莉娜貝貝魯多');
          router.go(0);
        }).catch(() => alert('ㄨㄚˊ 變身失敗了 QQ'));
      }
    };
  },
});
</script>
