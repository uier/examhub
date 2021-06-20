<template>
  <table class="min-w-full table-auto border-collapse rounded overflow-hidden shadow-md">
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
        <th class="pl-2 md:pl-6 py-4" />
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-100">
      <tr v-if="tableData.length === 0">
        <td colspan="3" class="pl-2 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          尚無公告
        </td>
      </tr>
      <tr v-for="({ createTime, title, name, pinned, annId }, index) in tableData" :key="annId">
        <td class="pl-2 md:pl-6 py-4 text-sm md:text-base text-gray-900">
          {{ createTime }}
        </td>
        <td class="pl-2 md:pl-6 py-4 text-sm md:text-lg text-gray-900">
          {{ pinned ? '📌' : '' }} {{ title }}
        </td>
        <td class="hidden md:table-cell pl-6 py-4 text-sm md:text-base text-gray-900">
          {{ name }}
        </td>
        <td class="pl-2 md:pl-6 py-4 text-sm md:text-base text-blue-900">
          <div class="flex flex-col items-center space-y-0.5">
            <AnnounceDetail :data="tableData[index]" />
            <template v-if="user && user.role <= 1">
              <AnnounceForm :populateWith="tableData[index]" @submit="(...args) => $emit('edit-ann', ...args)" />
              <button type="button" class="text-rose-900 text-base" @click="$emit('delete-ann', annId)">
                刪除
              </button>
            </template>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import AnnounceForm from './AnnounceForm.vue';
import AnnounceDetail from './AnnounceDetail.vue';

export default {
  name: 'AnnounceTable',
  props: ['tableData', 'user'],
  components: { AnnounceForm, AnnounceDetail },
}
</script>
