<template>
  <div class="min-h-screen flex">
    <Sidebar :folder="folder" />
    <div class="flex-1 p-6">
      <div class="mb-3 flex justify-between items-start flex-wrap md:flex-nowrap">
        <Breadcrumb :selectedCourse="selectedCourse" />
        <ExamForm :courses="courses.data" @submit="createExam" />
      </div>
      <hr class="mb-3" />
      <!-- <pre class="text-xs">{{ JSON.stringify(folder, null, 2) }}</pre> -->
      <router-view />
    </div>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, reactive } from 'vue';
import { useRoute } from 'vue-router';
import api from '../api';
import Sidebar from './Sidebar.vue';
import Breadcrumb from './Breadcrumb.vue';
import ExamForm from '../components/ExamForm.vue';

export default defineComponent({
  name: 'Browse',
  components: { Sidebar, Breadcrumb, ExamForm },
  setup() {
    const route = useRoute();
    const courses = reactive({
      data: [] as Course.Info[],
      isLoading: true,
      isError: false,
    });

    api.Course.getList()
      .then((resp) => courses.data = resp.data)
      .catch(() => courses.isError = true);

    const selectedCourse = computed(() => {
      const id = route.params.courseId && Number(route.params.courseId);
      const data = courses.data.find(c => c.courseId === id);
      return { id, data };
    });

    const folder = computed(() => {
      const categories = [...new Set(courses.data.map((c) => c.category))];
      return categories.map(cat => {
        return {
          title: cat,
          items: courses.data.filter((c) => c.category === cat),
        };
      })
    });

    return {
      selectedCourse,
      courses,
      folder,
      createExam(body: Exam.CreateBody, resolve: any, reject: any) {
        api.Exam.create(body).then(resolve).catch(reject);
      },
    };
  },
});
</script>
