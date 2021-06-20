<template>
  <div class="my-6 px-10">
    <div class="mb-4 flex">
      <h1 class="font-medium text-2xl text-gray-900">課程列表</h1>
      <div class="flex-1" />
      <CourseForm @submit="createCourse" />
    </div>
    <p v-if="courses.isLoading">Loading...</p>
    <p v-else-if="courses.isError">error</p>
    <CourseTable v-else :tableData="courses.tableData" @edit-course="editCourse" @delete-course="deleteCourse" />

    <h1 class="font-medium text-2xl text-gray-900 mb-4 mt-8">使用者列表</h1>
    <p v-if="users.isLoading">Loading...</p>
    <p v-else-if="users.isError">error</p>
    <UserTable v-else :tableData="users.tableData" :ROLE="ROLE" />
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive } from 'vue';
import dayjs from 'dayjs';
import api from '../api';
import UserTable from '../components/User/UserTable.vue';
import CourseTable from '../components/Manage/CourseTable.vue';
import CourseForm from '../components/Manage/CourseForm.vue';

const ROLE = ['ADMIN', 'EDITOR', 'USER'];

interface UserDataState {
  tableData: User.Detail[]
  isLoading: boolean
  isError: boolean
}

interface CourseDataState {
  tableData: Course.Info[]
  isLoading: boolean
  isError: boolean
}

export default defineComponent({
  name: 'Manage',
  components: { UserTable, CourseTable, CourseForm },
  setup() {
    const courses: CourseDataState = reactive({
      tableData: [],
      isLoading: true,
      isError: false,
    });

    const users: UserDataState = reactive({
      tableData: [],
      isLoading: true,
      isError: false,
    });

    api.Course.getList()
      .then((resp) => courses.tableData = resp.data)
      .catch(() => courses.isError = true)
      .finally(() => courses.isLoading = false);

    api.Users.getList()
      .then((resp) => {
        users.tableData = resp.data.map((item) => ({
          ...item,
          createTime: dayjs(item.createTime).format('YYYY-MM-DD HH:mm'),
        }));
      })
      .catch(() => users.isError = true)
      .finally(() => users.isLoading = false);

    const createCourse = (data: Course.CreateBody, resolve: any, reject: any) => {
      api.Course.create(data).then(resolve).catch(reject);
    };

    const editCourse = (data: Course.Info, resolve: any, reject: any) => {
      const { courseId, courseName, deptName, category, description } = data;
      const modifyBody: Course.CreateBody = {
        courseName, deptName, category, description,
      };
      api.Course.modify(courseId, modifyBody).then(resolve).catch(reject);
    };

    const deleteCourse = (courseId: number) => {
      alert('Sorry~ 我們還沒做刪除功能耶，歡迎發 PR > <');
    };

    return {
      ROLE,
      courses,
      users,
      createCourse,
      editCourse,
      deleteCourse,
    };
  },
});
</script>
