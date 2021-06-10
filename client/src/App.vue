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
import Header from '@/components/Header.vue';

export default {
  name: 'App',
  components: { Header },
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
