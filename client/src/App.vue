<template>
  <Header />
  <main class="px-6 py-6 max-w-7xl mx-auto">
    <router-view />
  </main>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { useStore } from './store';
import { ActionTypes } from './store/types';
import { onMounted } from '@vue/runtime-core';
import Header from './components/Header.vue'

export default defineComponent({
  name: 'App',
  components: {
    Header
  },
  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch(ActionTypes.GET_USER);
    });
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
