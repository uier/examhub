<template>
  <h1>home</h1>
  <el-table
    :data="tableData"
    stripe
    style="width: 50%">
    <el-table-column
      prop="createTime"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="userId"
      label="姓名"
      width="80">
    </el-table-column>
    <el-table-column
      prop="title"
      label="標題">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'Home',
  setup() {
    const tableData = [{
      annId: 1,
      userId: 1,
      pinned: false,
      title: '史福汽臺，還民們重是知總，陸式事計情北麼！',
      createTime: '2021-06-16 16:00:00',
    }, {
      annId: 2,
      userId: 1,
      pinned: false,
      title: '史福汽臺，還民們重是知總，陸式事計情北麼！',
      createTime: '2021-06-16 15:00:00',
    }, {
      annId: 3,
      userId: 2,
      pinned: true,
      title: '史福汽臺，還民們重是知總，陸式事計情北麼！',
      createTime: '2021-06-16 14:00:00',
    }].sort((a, b) => {
      if (a.pinned) return -1;
      if (b.pinned) return 1;
      return 1;
    }).map((data) => {
      const newData = { ...data };
      if (newData.pinned) {
        newData.title = `【置頂】${newData.title}`;
      }
      return newData;
    });

    return {
      tableData,
    };
  },
};
</script>
