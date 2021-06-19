<template>
  <table class="min-w-full table-auto border-collapse rounded overflow-hidden shadow-md">
    <thead class="bg-rose-200">
      <tr>
        <th scope="col" class="pl-2 md:pl-6 py-4 text-left text-sm md:text-lg text-gray-700">
          ID
        </th>
        <th scope="col" class="pl-2 md:pl-6 py-4 text-left text-sm md:text-lg text-gray-700">
          課程名稱
        </th>
        <th scope="col" class="pl-2 md:pl-6 py-4 text-left text-sm md:text-lg text-gray-700">
          所屬系所
        </th>
        <th scope="col" class="pl-2 md:pl-6 py-4 text-left text-sm md:text-lg text-gray-700">
          所屬分類
        </th>
        <th scope="col" class="pl-2 md:pl-6 py-4 text-left text-sm md:text-lg text-gray-700 w-1/4 md:w-1/2">
          <div class="block max-h-20 overflow-y-auto">
            詳細資訊
          </div>
        </th>
        <th scope="col" class="pl-2 md:pl-6 py-4" />
      </tr>
    </thead>
    <tbody class="bg-gay-50 divide-y divide-gray-100">
      <tr v-for="({ courseId, courseName, deptName, category, description }, index) in tableData" :key="courseId">
        <td class="pl-2 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          {{ courseId }}
        </td>
        <td class="pl-2 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          {{ courseName }}
        </td>
        <td class="pl-2 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          {{ deptName }}
        </td>
        <td class="pl-2 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          {{ category }}
        </td>
        <td class="pl-2 md:pl-6 py-4 text-sm md:text-base text-gray-900 w-1/4 md:w-1/2">
          <div class="block max-h-20 overflow-y-auto">
            {{ description }}
          </div>
        </td>
        <td class="pl-2 md:pl-6 py-4 text-sm md:text-base text-blue-900">
          <div class="flex flex-col items-center">
            <CourseForm :populateWith="tableData[index]" @submit="(...args) => $emit('edit-course', ...args)" />
            <button type="button" class="mt-0.5 text-rose-900 text-base" @click="$emit('delete-course', courseId)">
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import CourseForm from '../components/CourseForm.vue';

export default {
  props: ['tableData'],
  components: { CourseForm },
}
</script>
