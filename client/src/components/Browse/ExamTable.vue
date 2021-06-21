<template>
  <table class="table-fixed my-table">
    <thead class="bg-rose-200">
      <tr>
        <th class="w-24 my-th">學年度</th>
        <th class="w-20 my-th">學期</th>
        <th class="w-1/5 my-th">標題</th>
        <th class="hidden sm:table-cell my-th">詳細資訊</th>
        <th class="w-24 my-th">評分</th>
        <th class="w-24 my-th"></th>
      </tr>
    </thead>
    <tbody class="my-tbody">
      <tr v-if="tableData.length === 0">
        <td colspan="5" class="my-td">
          此課程尚無考古題，成為第一個上傳的人吧！
        </td>
      </tr>
      <tr v-for="({ docId, year, semester, title, description, score }, index) in tableData" :key="docId">
        <td class="my-td">{{ year }}</td>
        <td class="my-td">{{ semester }}</td>
        <td class="my-td">{{ title }}</td>
        <td class="hidden sm:table-cell my-td">
          <div class="block max-h-20 overflow-y-auto break-all">
            {{ description }}
          </div>
        </td>
        <td class="my-td">{{ score }}</td>
        <td class="my-td">
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
