<template>
  <div class="bg-rose-300">
    <div class="h-16 px-6 mx-auto flex items-stretch">
      <div class="flex justify-start items-center lg:w-0 lg:flex-1 mr-5 md:mr-10">
        <img class="h-8 w-auto sm:h-12" src="@/assets/logo.png" />
        <h1 class="hidden sm:inline text-xl ml-2 text-gray-700 font-medium">師大資工考古題</h1>
      </div>

      <div class="flex-1 flex items-stretch justify-end">
        <router-link
          :to="{ name: 'Home' }"
          :class="{ 'bg-rose-200': route.name === 'Home' }"
          class="md:text-lg text-gray-700 font-medium flex-1 hover:bg-rose-200 flex items-center justify-center"
        >
          首頁
        </router-link>
        <router-link
          :to="{ name: 'Browse' }"
          :class="{ 'bg-rose-200': route.name === 'Browse' }"
          class="md:text-lg text-gray-700 font-medium flex-1 hover:bg-rose-200 flex items-center justify-center"
        >
          考古題
        </router-link>
        <router-link
          :to="{ name: 'Manage' }"
          :class="{ 'bg-rose-200': route.name === 'Manage' }"
          class="md:text-lg text-gray-700 font-medium flex-1 hover:bg-rose-200 flex items-center justify-center"
          v-if="user && user.role === 0"
        >
          管理介面
        </router-link>
        <router-link
          :to="{ name: 'Login' }"
          :class="{ 'bg-rose-200': route.name === 'Login' }"
          class="md:text-lg text-gray-700 font-medium flex-1 hover:bg-rose-200 flex items-center justify-center"
          v-if="!user"
        >
          登入
        </router-link>
        <router-link
          :to="{ name: 'User', params: { id: user.id } }"
          :class="{ 'bg-rose-200': route.name === 'User' }"
          class="md:text-lg text-gray-700 font-medium flex-1 hover:bg-rose-200 flex items-center justify-center"
          v-else
        >
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
      route,
      defaultActive,
      user,
    };
  },
});
</script>

<style>

</style>
