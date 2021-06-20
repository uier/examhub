<template>
  <table class="min-w-full table-fixed border-collapse rounded overflow-hidden shadow-md">
    <thead class="bg-rose-200">
      <tr>
        <th class="w-24 pl-2 md:pl-6 py-4 text-left text-sm md:text-lg text-gray-700">
          學年度
        </th>
        <th class="w-20 pl-2 md:pl-6 py-4 text-left text-sm md:text-lg text-gray-700">
          學期
        </th>
        <th class="w-1/5 pl-2 md:pl-6 py-4 text-left text-sm md:text-lg text-gray-700">
          標題
        </th>
        <th class="pl-2 md:pl-6 py-4 text-left text-sm md:text-lg text-gray-700">
          詳細資訊
        </th>
        <th class="w-24 pl-2 md:pl-6 py-4 text-left text-sm md:text-lg text-gray-700">
          評分
        </th>
      </tr>
    </thead>
    <tbody class="bg-gay-50 divide-y divide-gray-100">
      <tr v-if="tableData.length === 0">
        <td colspan="5" class="pl-2 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          此課程尚無考古題，成為第一個上傳的人吧！
        </td>
      </tr>
      <tr v-for="{ docId, year, semester, title, description, upvote, downvote } in tableData" :key="docId">
        <td class="pl-2 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          {{ year }}
        </td>
        <td class="pl-2 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          {{ semester }}
        </td>
        <td class="pl-2 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          {{ title }}
        </td>
        <td class="pl-2 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          <div class="block max-h-20 overflow-y-auto break-all">
            {{ description }}
          </div>
        </td>
        <td class="pl-2 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          {{ upvote - downvote }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['tableData']
}
</script>
