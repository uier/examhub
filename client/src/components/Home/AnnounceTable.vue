<template>
  <table class="table-fixed my-table">
    <thead class="bg-rose-200">
      <tr>
        <th class="w-32 my-th">日期</th>
        <th class="my-th">標題</th>
        <th class="w-24 hidden sm:table-cell my-th pl-6">發布者</th>
        <th class="w-24 pl-3 md:pl-6 py-4" />
      </tr>
    </thead>
    <tbody class="my-tbody">
      <tr v-if="tableData.length === 0">
        <td colspan="3" class="my-td">尚無公告</td>
      </tr>
      <tr v-for="({ createTime, title, name, pinned, annId }, index) in tableData" :key="annId">
        <td class="my-td">{{ createTime }}</td>
        <td class="my-td">
          <div class="block max-h-20 overflow-y-auto break-all">
            {{ pinned ? '📌' : '' }} {{ title }}
          </div>
        </td>
        <td class="hidden sm:table-cell my-td pl-6">{{ name }}</td>
        <td class="my-td">
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
