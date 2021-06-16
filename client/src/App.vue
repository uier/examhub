<template>
  <el-container>
    <Header />
    <el-main>
      <router-view />
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
import { useStore } from '@/store';
import { ActionTypes } from '@/store/types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { onMounted } from '@vue/runtime-core';
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: { Header },
  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch(ActionTypes.GET_USER);
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  padding: 0;
  margin: 0;
}
</style>
