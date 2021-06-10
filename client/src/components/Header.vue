<template>
  <el-header class="header" height="70px">
    <img src="@/assets/logo.jpg" class="header-logo" />
    <h1 class="header-logo-label">師大資工考古題系統</h1>
    <div style="flex: 1" />
    <el-menu
      router
      class="header-menu"
      mode="horizontal"
      background-color="#F07C82"
      text-color="#fff"
      active-text-color="#fff"
    >
      <el-menu-item
        class="header-menu-item"
        index="1"
        :route="{ path: '/' }"
      >
        首頁
      </el-menu-item>
      <el-menu-item
        class="header-menu-item"
        index="2"
        :route="{ path: '/browse' }"
      >
        考古題
      </el-menu-item>
      <el-menu-item
        class="header-menu-item"
        index="3"
        :route="{ path: '/manage' }"
      >
        管理介面
      </el-menu-item>
      <el-menu-item
        class="header-menu-item"
        index="4"
        :route="{ path: '/login' }"
      >
        登入
      </el-menu-item>
    </el-menu>
  </el-header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style>
.header {
  display: flex;
  align-items: center;
  background-color: #F07C82;
}
.header-logo {
  height: 90%;
  object-fit: cover;
}
.header-logo-label {
  color: white;
  margin-left: 20px;
}
.header-menu {
  height: 100%;
  display: flex;
  align-items: center;
}
.header-menu-item {
  width: 150px;
  text-align: center;
}
</style>
