<template>
  <Header />
  <main class="w-full mx-auto min-h-screen">
    <router-view />
  </main>
  <Footer />
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { useStore } from './store';
import { ActionTypes } from './store/types';
import { onMounted } from '@vue/runtime-core';
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default defineComponent({
  name: 'App',
  components: { Header, Footer },
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
