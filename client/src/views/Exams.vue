<template>
  <p v-if="exams.isLoading">Loading...</p>
  <p v-else-if="exams.isError">error</p>
  <ExamTable
    v-else
    :tableData="exams.tableData"
    :user="user"
    :courses="courses"
    @edit-exam="editExam"
    @delete-exam="deleteExam"
  />
</template>

<script lang='ts'>
import { defineComponent, reactive, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
import api from '../api';
import ExamTable from '../components/Browse/ExamTable.vue';
import { useStore } from '../store';

export default defineComponent({
  name: 'Exams',
  components: { ExamTable },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);
    const route = useRoute();
    const exams = reactive({
      tableData: [] as Exam.Info[],
      isLoading: true,
      isError: false,
    });
    const courses = reactive({
      data: [] as Course.Info[],
      isLoading: true,
      isError: false,
    });

    api.Course.getList()
      .then((resp) => courses.data = resp.data)
      .catch(() => courses.isError = true);

    const fetchData = (courseId: number) => {
      exams.isLoading = true;
      api.Exam.getList(courseId)
        .then((resp) => exams.tableData = resp.data.map(item => ({
          ...item,
          createTime: dayjs(item.createTime).format('YYYY-MM-DD HH:mm'),
          lastUpdateTime: dayjs(item.lastUpdateTime).format('YYYY-MM-DD HH:mm'),
        })))
        .catch(() => exams.isError = true)
        .finally(() => exams.isLoading = false);
    }

    watch(
      () => route.params.courseId,
      (value, prevValue) => {
        fetchData(Number(value));
      },
      { immediate: true },
    )

    return {
      exams,
      user,
      courses,
      editExam(data: any, resolve: any, reject: any) {
        const { docId, courseId, year, semester, title, description } = data;
        api.Exam.modify(docId, { courseId, year, semester, title, description })
          .then(resolve).catch(reject);
      },
      deleteExam(docId: number) {
        api.Exam.delete(docId)
          .then(() => fetchData(Number(route.params.courseId)))
          .catch(() => alert('刪除失敗了 QQ'));
      },
    };
  },
});
</script>
