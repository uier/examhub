<template>
  <table class="table-auto my-table">
    <thead class="bg-rose-200">
      <tr>
        <th class="my-th">ID</th>
        <th class="my-th">姓名</th>
        <th class="my-th">角色</th>
        <th class="my-th">貢獻值</th>
        <th class="my-th">Email</th>
        <th class="my-th">創建時間</th>
      </tr>
    </thead>
    <tbody class="my-tbody">
      <tr v-for="{ userId, name, role, contribution, email, createTime } in tableData" :key="userId">
        <td class="my-td">{{ userId }}</td>
        <td class="my-td">{{ name }}</td>
        <td class="my-td">{{ ROLE[role] }}</td>
        <td class="my-td">{{ contribution }}</td>
        <td class="my-td">{{ email }}</td>
        <td class="my-td">{{ createTime }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['tableData', 'ROLE']
}
</script>
