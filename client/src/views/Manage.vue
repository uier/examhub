<template>
  <h1 class="font-medium text-2xl text-gray-900 mb-4">使用者列表</h1>
  <p v-if="isLoading">Loading...</p>
  <p v-else-if="!tableData">error</p>
  <div v-else class="shadow border-b border-gray-200 sm:rounded-lg">
    <table class="min-w-full divide-y divide-gray-100 table-auto">
      <thead class="bg-rose-200">
        <tr>
          <th scope="col" class="pl-2 md:pl-6 py-3 text-left text-sm md:text-lg text-gray-900">
            ID
          </th>
          <th scope="col" class="pl-2 md:pl-6 py-3 text-left text-sm md:text-lg text-gray-900">
            姓名
          </th>
          <th scope="col" class="pl-2 md:pl-6 py-3 text-left text-sm md:text-lg text-gray-900">
            角色
          </th>
          <th scope="col" class="pl-2 md:pl-6 py-3 text-left text-sm md:text-lg text-gray-900">
            貢獻值
          </th>
          <th scope="col" class="pl-2 md:pl-6 py-3 text-left text-sm md:text-lg text-gray-900">
            Email
          </th>
          <th scope="col" class="pl-2 md:pl-6 py-3 text-left text-sm md:text-lg text-gray-900">
            創建時間
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-100">
        <tr v-for="{ userId, name, role, contribution, email, createTime } in tableData" :key="userId">
          <td class="pl-2 md:pl-6 py-4 text-sm md:text-base text-gray-600">
            {{ userId }}
          </td>
          <td class="pl-2 md:pl-6 py-4 text-sm md:text-base text-gray-600">
            {{ name }}
          </td>
          <td class="pl-2 md:pl-6 py-4 text-sm md:text-base text-gray-600">
            {{ ROLE[role] }}
          </td>
          <td class="pl-2 md:pl-6 py-4 text-sm md:text-base text-gray-600">
            {{ contribution }}
          </td>
          <td class="pl-2 md:pl-6 py-4 text-sm md:text-base text-gray-600">
            {{ email }}
          </td>
          <td class="pl-2 md:pl-6 py-4 text-sm md:text-base text-gray-600">
            {{ createTime }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang='ts'>
import { ref, defineComponent, reactive } from 'vue';
import dayjs from 'dayjs';
import api from '../api';

const ROLE = ['ADMIN', 'EDITOR', 'USER'];

export default defineComponent({
  name: 'Manage',
  setup() {
    const tableData: User.Detail[] = reactive([]);
    const isLoading = ref(true);
    const isError = ref(false);

    api.Users.getList()
      .then((resp) => {
        tableData.push(...resp.data.map((item) => ({
          ...item,
          createTime: dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss'),
        })));
      })
      .catch(() => {
        isError.value = true;
      })
      .finally(() => {
        isLoading.value = false;
      });

    return {
      tableData,
      isLoading,
      isError,
      ROLE,
    };
  },
});
</script>
