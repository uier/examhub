<template>
  <div class="my-6 px-10 flex flex-wrap lg:flex-nowrap lg:space-x-10">
    <div class="flex flex-col w-full lg:w-1/2 mb-8">
      <div class="mb-4 flex">
        <h1 class="font-medium text-2xl text-gray-900">公告</h1>
        <div class="flex-1" />
        <AnnounceForm v-if="user && user.role <= 1" @submit="createAnnounce" />
      </div>
      <p v-if="announcements.isLoading">Loading...</p>
      <p v-else-if="announcements.isError">error</p>
      <AnnounceTable v-else :tableData="announcements.tableData" :user="user" @edit-ann="editAnnounce" @delete-ann="deleteAnnounce" />
    </div>
    <div class="flex flex-col w-full lg:w-1/2 mb-8">
      <h1 class="font-medium text-2xl text-gray-900 mb-4">貢獻排行榜</h1>
      <p v-if="ranking.isLoading">Loading...</p>
      <p v-else-if="ranking.isError">error</p>
      <RankingTable v-else :tableData="ranking.tableData" />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, computed } from 'vue';
import dayjs from 'dayjs';
import { useStore } from '../store';
import api from '../api';
import AnnounceForm from '../components/Home/AnnounceForm.vue';
import AnnounceTable from '../components/Home/AnnounceTable.vue';
import RankingTable from '../components/Home/RankingTable.vue';

export default defineComponent({
  components: { AnnounceForm, AnnounceTable, RankingTable },
  name: 'Home',
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);
    const announcements = reactive({
      tableData: [] as Announcement.Info[],
      isLoading: true,
      isError: false,
    });
    const ranking = reactive({
      tableData: [] as Ranking.Info[],
      isLoading: true,
      isError: false,
    });

    const fetchData = () => {
      announcements.isLoading = true;
      api.Announcement.getList()
        .then((resp) => {
          announcements.tableData = resp.data.map((item) => ({
            ...item,
            createTime: dayjs(item.createTime).format('YYYY-MM-DD'),
            lastUpdateTime: dayjs(item.lastUpdateTime).format('YYYY-MM-DD'),
          })).sort((a, b) => {
            if (a.pinned) return -1;
            if (b.pinned) return 1;
            return 1;
          });
        })
        .catch(() => announcements.isError = true)
        .finally(() => announcements.isLoading = false);

      ranking.isLoading = true;
      api.Ranking.getList()
        .then((resp) => {
          const scores = resp.data.map(item => item.contribution);
          const topTenScores = [...new Set(scores)].slice(0, 10);
          ranking.tableData = resp.data
            .map(item => ({
              ...item,
              rank: topTenScores.indexOf(item.contribution) + 1,
            }))
            .filter(({ rank }) => rank !== -1);
        })
        .catch(() => ranking.isError = true)
        .finally(() => ranking.isLoading = false);
    };

    fetchData();

    return {
      announcements,
      ranking,
      createAnnounce(data: Announcement.CreateBody, cb: any) {
        api.Announcement.create(data)
          .then(() => fetchData())
          .then(cb)
          .catch((error) => {
            console.log(error)
            alert('新增失敗了 QQ')
          });
      },
      editAnnounce(data: Announcement.CreateBody & { annId: number }, cb: any) {
        const { annId, title, content, pinned } = data;
        const modifyBody: Announcement.CreateBody = { title, content, pinned };
        api.Announcement.modify(annId, modifyBody)
          .then(() => fetchData())
          .then(cb)
          .catch((error) => {
            console.log(error)
            alert('修改失敗了 QQ')
          });
      },
      deleteAnnounce(annId: number) {
        const confirm = window.confirm('確定要刪除嗎？');
        if (!confirm) return;
        api.Announcement.delete(annId)
          .then(() => fetchData())
          .catch(() => alert('刪除失敗了 QQ'));
      },
      fetchData,
      user,
    };
  },
});
</script>
