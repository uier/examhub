<template>
  <table class="min-w-full table-auto border-collapse rounded overflow-hidden shadow-md">
    <thead class="bg-rose-200">
      <tr>
        <th class="pl-3 md:pl-6 py-4 text-left text-sm md:text-base text-gray-700">
          ID
        </th>
        <th class="pl-3 md:pl-6 py-4 text-left text-sm md:text-base text-gray-700">
          姓名
        </th>
        <th class="pl-3 md:pl-6 py-4 text-left text-sm md:text-base text-gray-700">
          角色
        </th>
        <th class="pl-3 md:pl-6 py-4 text-left text-sm md:text-base text-gray-700">
          貢獻值
        </th>
        <th class="pl-3 md:pl-6 py-4 text-left text-sm md:text-base text-gray-700">
          Email
        </th>
        <th class="pl-3 md:pl-6 py-4 text-left text-sm md:text-base text-gray-700">
          創建時間
        </th>
      </tr>
    </thead>
    <tbody class="bg-gay-50 divide-y divide-gray-100">
      <tr v-for="{ userId, name, role, contribution, email, createTime } in tableData" :key="userId">
        <td class="pl-3 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          {{ userId }}
        </td>
        <td class="pl-3 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          {{ name }}
        </td>
        <td class="pl-3 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          {{ ROLE[role] }}
        </td>
        <td class="pl-3 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          {{ contribution }}
        </td>
        <td class="pl-3 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          {{ email }}
        </td>
        <td class="pl-3 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          {{ createTime }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['tableData', 'ROLE']
}
</script>
