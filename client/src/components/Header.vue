<template>
  <div class="bg-rose-300">
    <div class="px-6 py-3 max-w-7xl mx-auto flex items-center">
      <div class="flex justify-start items-center lg:w-0 lg:flex-1 mr-5 md:mr-10">
        <img class="h-8 w-auto sm:h-12" src="@/assets/logo.png" />
        <h1 class="hidden sm:inline font-regular text-xl text-black ml-2">師大資工考古題</h1>
      </div>

      <div class="flex items-center justify-end flex-1 space-x-5 md:space-x-10 lg:space-x-20">
        <router-link
          :to="{ name: 'Home' }"
          class="flex-1 font-regular text-sm md:text-lg text-black text-center hover:underline">
          首頁
        </router-link>
        <router-link
          :to="{ name: 'Browse' }"
          class="flex-1 font-regular text-sm md:text-lg text-black text-center hover:underline">
          考古題
        </router-link>
        <router-link
          v-if="user && user.role === 0"
          :to="{ name: 'Manage' }"
          class="flex-1 font-regular text-sm md:text-lg text-black text-center hover:underline">
          管理介面
        </router-link>
        <router-link
          v-if="!user"
          :to="{ name: 'Login' }"
          class="flex-1 font-regular text-sm md:text-lg text-black text-center hover:underline">
          登入
        </router-link>
        <router-link
          v-else
          :to="{ name: 'User', params: { id: user.id } }"
          class="mx-4 flex-1 font-regular text-sm md:text-lg text-black text-center hover:underline">
          {{ user.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { computed } from '@vue/runtime-core';
import { useStore } from '../store';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'Header',
  setup() {
    const route = useRoute();
    const defaultActive = computed(() => {
      if (route.name === 'Home') return '1';
      if (route.name === 'Browse') return '2';
      if (route.name === 'Manage') return '3';
      if (route.name === 'Login' || route.name === 'User') return '4';
      return undefined;
    });
    const store = useStore();
    const user = computed(() => store.state.user);
    return {
      defaultActive,
      user,
    };
  },
});
</script>

<style>

</style>
