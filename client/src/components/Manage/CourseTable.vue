<template>
  <table class="table-fixed my-table">
    <thead class="bg-rose-200">
      <tr>
        <th class="w-4 my-th">ID</th>
        <th class="w-1/5 my-th">課程名稱</th>
        <th class="w-16 my-th">所屬系所</th>
        <th class="w-16 my-th">所屬分類</th>
        <th class="w-4 my-th">考古題</th>
        <th class="w-1/4 my-th">詳細資訊</th>
        <th class="w-8 pl-3 md:pl-6 py-4" />
      </tr>
    </thead>
    <tbody class="my-tbody">
      <tr v-for="({ courseId, courseName, deptName, category, docNum, description }, index) in tableData" :key="courseId">
        <td class="my-td">{{ courseId }}</td>
        <td class="my-td">{{ courseName }}</td>
        <td class="my-td">{{ deptName }}</td>
        <td class="my-td">{{ category }}</td>
        <td class="my-td">{{ docNum }}</td>
        <td class="my-td">
          <div class="block max-h-20 overflow-y-auto break-all">
            {{ description }}
          </div>
        </td>
        <td class="my-td">
          <div class="flex flex-col items-center space-y-0.5">
            <CourseForm :populateWith="tableData[index]" @submit="(...args) => $emit('edit-course', ...args)" />
            <button type="button" class="text-rose-900 text-base" @click="$emit('delete-course', courseId)">
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import CourseForm from './CourseForm.vue';

export default {
  props: ['tableData'],
  components: { CourseForm },
}
</script>
