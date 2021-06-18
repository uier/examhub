<template>
  <div class="flex flex-wrap lg:flex-nowrap lg:space-x-8">
    <div class="flex flex-col w-full lg:w-1/2 mb-8">
      <h1 class="font-medium text-2xl text-gray-900 mb-4">公告</h1>
      <p v-if="isLoading">Loading...</p>
      <p v-else-if="isError">error</p>
      <div v-else class="shadow border-b border-gray-200 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-100 table-auto">
          <thead class="bg-rose-200">
            <tr>
              <th scope="col" class="pl-2 md:pl-6 py-3 text-left text-sm md:text-lg text-gray-900">
                日期
              </th>
              <th scope="col" class="pl-2 md:pl-6 py-3 text-left text-sm md:text-lg text-gray-900">
                標題
              </th>
              <th scope="col" class="hidden md:block pl-6 py-3 text-left text-sm md:text-lg text-gray-900">
                發布者
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-100">
            <tr v-for="{ createTime, title, userId, pinned, annId } in tableData" :key="annId">
              <td class="pl-2 md:pl-6 py-4 text-sm md:text-base text-gray-600">
                {{ createTime }}
              </td>
              <td class="pl-2 md:pl-6 py-4 text-sm md:text-lg text-gray-900">
                {{ pinned ? '📌' : '' }} {{ title }}
              </td>
              <td class="hidden md:block pl-6 py-4 text-sm md:text-base text-gray-600">
                {{ userId }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex flex-col w-full lg:w-1/2 mb-8">
      <h1 class="font-medium text-2xl text-gray-900 mb-4">貢獻排行榜</h1>
    </div>
  </div>
</template>

<script lang='ts'>
import { ref, defineComponent, reactive } from 'vue';
import dayjs from 'dayjs';
import api from '../api';

export default defineComponent({
  name: 'Home',
  setup() {
    const tableData: Announcement.ListItem[] = reactive([]);
    const isLoading = ref(true);
    const isError = ref(false);

    api.Announcement.getList()
      .then((resp) => {
        tableData.push(...resp.data.map((item) => ({
          ...item,
          createTime: dayjs(item.createTime).format('YYYY-MM-DD'),
        })).sort((a, b) => {
          if (a.pinned) return -1;
          if (b.pinned) return 1;
          return 1;
        }));
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
    };
  },
});
</script>
