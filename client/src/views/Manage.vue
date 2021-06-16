<template>
  <h1>manage</h1>
  <p v-if="isLoading">Loading...</p>
  <p v-else-if="!tableData">error</p>
  <el-table
    v-else
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="userId"
      label="ID">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="role"
      label="權限">
    </el-table-column>
    <el-table-column
      prop="contribution"
      label="貢獻值">
    </el-table-column>
    <el-table-column
      prop="email"
      label="電子信箱">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="註冊時間">
    </el-table-column>
  </el-table>
</template>

<script>
import { ref } from 'vue';
import dayjs from 'dayjs';
import api from '../api';

const ROLE = ['ADMIN', 'EDITOR', 'USER'];

export default {
  name: 'Manage',
  setup() {
    const tableData = ref(null);
    const isLoading = ref(true);

    api.Users.getList()
      .then((resp) => {
        tableData.value = resp.data.map((item) => ({
          ...item,
          role: ROLE[item.role],
          createTime: dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss'),
        }));
      })
      .finally(() => {
        isLoading.value = false;
      });

    return {
      tableData,
      isLoading,
    };
  },
};
</script>
