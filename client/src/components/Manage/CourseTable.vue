<template>
  <table class="min-w-full table-fixed border-collapse rounded overflow-hidden shadow-md">
    <thead class="bg-rose-200">
      <tr>
        <th class="w-4 pl-3 md:pl-6 py-4 text-left text-sm md:text-base text-gray-700">
          ID
        </th>
        <th class="w-1/5 pl-3 md:pl-6 py-4 text-left text-sm md:text-base text-gray-700">
          課程名稱
        </th>
        <th class="w-16 pl-3 md:pl-6 py-4 text-left text-sm md:text-base text-gray-700">
          所屬系所
        </th>
        <th class="w-16 pl-3 md:pl-6 py-4 text-left text-sm md:text-base text-gray-700">
          所屬分類
        </th>
        <th class="w-4 pl-3 md:pl-6 py-4 text-left text-sm md:text-base text-gray-700">
          考古題
        </th>
        <th class="w-1/4 pl-3 md:pl-6 py-4 text-left text-sm md:text-base text-gray-700">
          詳細資訊
        </th>
        <th class="w-8 pl-3 md:pl-6 py-4" />
      </tr>
    </thead>
    <tbody class="bg-gay-50 divide-y divide-gray-100">
      <tr v-for="({ courseId, courseName, deptName, category, docNum, description }, index) in tableData" :key="courseId">
        <td class="pl-3 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          {{ courseId }}
        </td>
        <td class="pl-3 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          {{ courseName }}
        </td>
        <td class="pl-3 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          {{ deptName }}
        </td>
        <td class="pl-3 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          {{ category }}
        </td>
        <td class="pl-3 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          {{ docNum }}
        </td>
        <td class="pl-3 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          <div class="block max-h-20 overflow-y-auto break-all">
            {{ description }}
          </div>
        </td>
        <td class="pl-3 md:pl-6 py-4 text-sm md:text-base text-blue-900">
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
