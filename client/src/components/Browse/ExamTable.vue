<template>
  <table class="min-w-full table-fixed border-collapse rounded overflow-hidden shadow-md">
    <thead class="bg-rose-200">
      <tr>
        <th class="w-24 pl-3 md:pl-6 py-4 text-left text-sm md:text-base text-gray-700">
          學年度
        </th>
        <th class="w-20 pl-3 md:pl-6 py-4 text-left text-sm md:text-base text-gray-700">
          學期
        </th>
        <th class="w-1/5 pl-3 md:pl-6 py-4 text-left text-sm md:text-base text-gray-700">
          標題
        </th>
        <th class="hidden sm:table-cell pl-3 md:pl-6 py-4 text-left text-sm md:text-base text-gray-700">
          詳細資訊
        </th>
        <th class="w-24 pl-3 md:pl-6 py-4 text-left text-sm md:text-base text-gray-700">
          評分
        </th>
        <th class="w-24 pl-3 md:pl-6 py-4 text-left text-sm md:text-base text-gray-700">
        </th>
      </tr>
    </thead>
    <tbody class="bg-gay-50 divide-y divide-gray-100">
      <tr v-if="tableData.length === 0">
        <td colspan="5" class="pl-3 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          此課程尚無考古題，成為第一個上傳的人吧！
        </td>
      </tr>
      <tr v-for="({ docId, year, semester, title, description, score }, index) in tableData" :key="docId">
        <td class="pl-3 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          {{ year }}
        </td>
        <td class="pl-3 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          {{ semester }}
        </td>
        <td class="pl-3 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          {{ title }}
        </td>
        <td class="hidden sm:table-cell pl-3 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          <div class="block max-h-20 overflow-y-auto break-all">
            {{ description }}
          </div>
        </td>
        <td class="pl-3 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          {{ score }}
        </td>
        <td class="pl-3 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          <div class="flex flex-col items-center space-y-0.5">
            <ExamDetail :data="tableData[index]" />
            <template v-if="user && user.role <= 1">
              <ExamForm :populateWith="tableData[index]" @submit="(...args) => $emit('edit-exam', ...args)" />
              <button type="button" class="text-rose-900 text-base" @click="$emit('delete-exan', docId)">
                刪除
              </button>
            </template>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import ExamDetail from './ExamDetail.vue';
import ExamForm from './ExamForm.vue';

export default {
  props: ['tableData', 'user'],
  components: { ExamDetail, ExamForm },
}
</script>
