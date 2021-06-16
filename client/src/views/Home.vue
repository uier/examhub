<template>
  <div style="display: flex">
    <div style="display: flex; flex-direction: column; width: 50%">
      <h1>公告</h1>
      <p v-if="isLoading">Loading...</p>
      <p v-else-if="!tableData">error</p>
      <el-table
        v-else
        :data="tableData"
        stripe>
        <el-table-column
          prop="createTime"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="userId"
          label="發布者"
          width="80">
        </el-table-column>
        <el-table-column
          prop="title"
          label="標題">
        </el-table-column>
      </el-table>
    </div>
    <div style="display: flex; flex-direction: column; width: 50%">
      <h1>貢獻排行榜</h1>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import dayjs from 'dayjs';
import api from '../api';

export default {
  name: 'Home',
  setup() {
    const tableData = ref(null);
    const isLoading = ref(true);

    api.Announcement.getList()
      .then((resp) => {
        tableData.value = resp.data.map((item) => ({
          ...item,
          title: item.pinned ? `【置頂】${item.title}` : item.title,
          createTime: dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss'),
        })).sort((a, b) => {
          if (a.pinned) return -1;
          if (b.pinned) return 1;
          return 1;
        });
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
