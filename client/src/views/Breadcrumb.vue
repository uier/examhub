<template>
  <div class="w-full mb-3 flex items-center">
    <template v-if="selectedCourse.data">
      <router-link to="/browse" class="hover:text-blue-900">
        考古題
      </router-link>

      <ChevronRightIcon class="mx-2 w-4 h-4" />

      <router-link
        :to="`/browse/${selectedCourse.data.courseId}`"
        class="hover:text-blue-900"
      >
        {{ selectedCourse.data.courseName }}
      </router-link>
    </template>
    <div v-else>選擇左側課程開始瀏覽</div>
  </div>
</template>

<script>
import { ChevronRightIcon } from '@heroicons/vue/solid';

export default {
  name: 'Breadcrumb',
  components: { ChevronRightIcon },
  props: ['selectedCourse'],
}
</script>
