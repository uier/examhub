<template>
  <div class="my-6 px-6 flex flex-wrap lg:flex-nowrap lg:space-x-8">
    <div class="flex flex-col w-full lg:w-1/2 mb-8">
      <div class="mb-4 flex">
        <h1 class="font-medium text-2xl text-gray-900">公告</h1>
        <div class="flex-1" />
        <AnnounceForm @submit="createAnnounce" />
      </div>
      <p v-if="announcements.isLoading">Loading...</p>
      <p v-else-if="announcements.isError">error</p>
      <table v-else class="min-w-full table-auto border-collapse rounded overflow-hidden shadow-md">
        <thead class="bg-rose-200">
          <tr>
            <th class="pl-2 md:pl-6 py-4 text-left text-sm md:text-lg text-gray-700">
              日期
            </th>
            <th class="pl-2 md:pl-6 py-4 text-left text-sm md:text-lg text-gray-700">
              標題
            </th>
            <th class="hidden md:table-cell pl-6 py-4 text-left text-sm md:text-lg text-gray-700">
              發布者
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          <tr v-if="announcements.tableData.length === 0">
            <td colspan="3" class="pl-2 md:pl-6 py-4 text-sm md:text-base text-gray-900">
              尚無公告
            </td>
          </tr>
          <tr v-for="{ createTime, title, userId, pinned, annId } in announcements.tableData" :key="annId">
            <td class="pl-2 md:pl-6 py-4 text-sm md:text-base text-gray-900">
              {{ createTime }}
            </td>
            <td class="pl-2 md:pl-6 py-4 text-sm md:text-lg text-gray-900">
              {{ pinned ? '📌' : '' }} {{ title }}
            </td>
            <td class="hidden md:table-cell pl-6 py-4 text-sm md:text-base text-gray-900">
              {{ userId }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex flex-col w-full lg:w-1/2 mb-8">
      <h1 class="font-medium text-2xl text-gray-900 mb-4">貢獻排行榜</h1>
    </div>
    <!-- <button @click="create">Send</button> -->
  </div>
</template>

<script lang='ts'>
import { ref, defineComponent, reactive } from 'vue';
import dayjs from 'dayjs';
import api from '../api';
import AnnounceForm from '../components/Home/AnnounceForm.vue';

export default defineComponent({
  components: { AnnounceForm },
  name: 'Home',
  setup() {
    const announcements: {
      tableData: Announcement.ListItem[]
      isLoading: boolean
      isError: boolean
    } = reactive({
      tableData: [],
      isLoading: true,
      isError: false,
    });

    api.Announcement.getList()
      .then((resp) => {
        announcements.tableData = resp.data.map((item) => ({
          ...item,
          createTime: dayjs(item.createTime).format('YYYY-MM-DD'),
        })).sort((a, b) => {
          if (a.pinned) return -1;
          if (b.pinned) return 1;
          return 1;
        });
      })
      .catch(() => announcements.isError = true)
      .finally(() => announcements.isLoading = false);

    return {
      announcements,
      createAnnounce(data: Announcement.CreateBody, resolve: any, reject: any) {
        api.Announcement.create(data).then(resolve).catch(reject);
      },
    };
  },
});
</script>
