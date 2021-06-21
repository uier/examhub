<template>
  <table class="table-auto my-table">
    <thead class="bg-rose-200">
      <tr>
        <th class="my-th">名次</th>
        <th class="my-th">名稱</th>
        <th class="my-th">貢獻值</th>
        <th class="pl-3 md:pl-6 py-4" />
      </tr>
    </thead>
    <tbody class="my-tbody">
      <tr v-if="tableData.length === 0">
        <td colspan="3" class="my-td">
          尚無資料
        </td>
      </tr>
      <tr v-for="({ rank, name, contribution }, index) in tableData" :key="index">
        <td class="my-td">{{ rank }}</td>
        <td class="my-td">{{ name }}</td>
        <td class="my-td">{{ contribution }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'RankingTable',
  props: ['tableData'],
}
</script>
