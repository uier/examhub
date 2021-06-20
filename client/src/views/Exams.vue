<template>
  <p v-if="exams.isLoading">Loading...</p>
  <p v-else-if="exams.isError">error</p>
  <ExamTable v-else :tableData="exams.tableData" />
</template>

<script lang='ts'>
import { defineComponent, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
import api from '../api';
import ExamTable from '../components/Browse/ExamTable.vue';

export default defineComponent({
  name: 'Exams',
  components: { ExamTable },
  setup() {
    const route = useRoute();
    const exams = reactive({
      tableData: [] as Exam.Info[],
      isLoading: true,
      isError: false,
    });

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
    };
  },
});
</script>
