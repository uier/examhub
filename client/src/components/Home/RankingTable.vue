<template>
  <table class="min-w-full table-auto border-collapse rounded overflow-hidden shadow-md">
    <thead class="bg-rose-200">
      <tr>
        <th class="pl-2 md:pl-6 py-4 text-left text-sm md:text-lg text-gray-700">
          名次
        </th>
        <th class="pl-2 md:pl-6 py-4 text-left text-sm md:text-lg text-gray-700">
          名稱
        </th>
        <th class="hidden md:table-cell pl-6 py-4 text-left text-sm md:text-lg text-gray-700">
          貢獻值
        </th>
        <th class="pl-2 md:pl-6 py-4" />
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-100">
      <tr v-if="tableData.length === 0">
        <td colspan="3" class="pl-2 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          尚無資料
        </td>
      </tr>
      <tr v-for="({ rank, name, contribution }, index) in tableData" :key="index">
        <td class="pl-2 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          {{ rank }}
        </td>
        <td class="pl-2 md:pl-6 py-4 text-sm text-gray-900">
          {{ name }}
        </td>
        <td class="hidden md:table-cell pl-6 py-4 text-sm md:text-base text-gray-900">
          {{ contribution }}
        </td>
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
