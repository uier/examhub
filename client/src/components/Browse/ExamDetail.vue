<template>
  <div>
    <button type="button" @click="openModal" class="text-green-700 text-base">
      檢視
    </button>
    <Dialog as="div" :open="isOpen" @close="closeModal">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <DialogOverlay class="fixed inset-0 bg-gray-300 bg-opacity-50" />

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <div class="inline-block w-full md:max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <div class="w-full flex justify-end">
              <button class="focus:outline-none" type="button" @click="closeModal">
                <XIcon class="h-5 w-5 text-right" />
              </button>
            </div>

            <DialogTitle as="h3" class="text-lg font-medium text-center text-gray-900">
              {{ data.title }}
            </DialogTitle>

            <div class="flex justify-between items-center">
              <div class="mt-2 mb-4 text-xs">
                <div class="text-gray-500">
                  Posted on: <span class="text-gray-800">{{ data.createTime }}</span>
                </div>
                <div class="text-gray-500">
                  Posted by: <span class="text-gray-800">{{ data.name }}</span>
                </div>
              </div>
              <div class="flex flex-col items-center space-y-2">
                <div>
                  <span class="font-mono text-sm text-gray-500">
                    目前評分：{{ data.score }}
                  </span>
                </div>
                <div class="flex space-x-2">
                  <button class="focus:outline-none" type="button" @click="voteExam(1)">
                    <LikeIcon v-if="score === 1" class="h-6 w-6 text-green-500" />
                    <LikeIcon v-else class="h-6 w-6 text-gray-500" />
                  </button>
                  <button class="focus:outline-none" type="button" @click="voteExam(-1)">
                    <DislikeIcon v-if="score === -1" class="h-6 w-6 text-rose-500" />
                    <DislikeIcon v-else class="h-6 w-6 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            <div class="mt-2 min-h-screen-2/3">
              <p class="whitespace-pre-line">{{ data.description }}</p>
            </div>

            <div class="mt-4 mb-2 text-gray-500 text-xs">
              Last updated on: <span class="text-gray-800">{{ data.lastUpdateTime }}</span>
            </div>

            <hr />

            <p v-if="comments.isLoading">Loading...</p>
            <p v-else-if="comments.isError">error</p>
            <template
              v-else
              v-for="({ comId, name, content, createTime, replies }, index) in comments.data"
              :key="comId"
            >
              <CommentItem
                class="m-2"
                :name="name"
                :content="content"
                :createTime="createTime"
              />
              <CommentItem
                v-for="reply in replies"
                :key="reply.comId"
                class="m-2 ml-10 md:ml-20"
                :name="reply.name"
                :content="reply.content"
                :createTime="reply.createTime"
              />
              <button
                v-if="!isOpenReply[index]"
                class="ml-10 md:ml-20 text-xs text-blue-900 text-opacity-75"
                type="button"
                @click="isOpenReply[index] = !isOpenReply[index]"
              >
                回覆
              </button>
              <CommentInput
                v-else
                class="ml-10 md:ml-20"
                @submit="(...args) => createComment(comId, ...args)"
              />

            </template>

            <CommentInput
              class="mt-4"
              @submit="(...args) => createComment(data.docId, ...args)"
            />

          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script lang='ts'>
import { ref, Ref, reactive, defineComponent, computed } from 'vue';
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
} from '@headlessui/vue';
import { XIcon } from '@heroicons/vue/solid';
import { useStore } from '../../store';
import TextArea from '../UI/TextArea.vue';
import CommentItem from '../UI/CommentItem.vue';
import CommentInput from '../UI/CommentInput.vue';
import LikeIcon from '../Icon/LikeIcon.vue';
import DislikeIcon from '../Icon/DislikeIcon.vue';
import api from '../../api';

export default defineComponent({
  name: 'ExamDetail',
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    XIcon,
    TextArea,
    CommentItem,
    CommentInput,
    LikeIcon,
    DislikeIcon,
  },
  props: ['data'],
  setup(props, { emit }) {
    const comments = reactive({
      data: [] as Comment.Info[],
      isLoading: true,
      isError: false,
    });
    const score = ref(0);
    const isOpenReply = ref([]) as Ref<boolean[]>;
    const isOpen = ref(false);
    const store = useStore();
    const user = computed(() => store.state.user);

    const fetchData = () => {
      api.Comment.getList(props.data.docId)
        .then((resp) => {
          comments.data = resp.data;
          Promise.all(resp.data.map((item: Comment.Info) => api.Comment.getList(item.comId)))
            .then((resps) => {
              comments.data = comments.data.map((item, index) => ({
                ...item,
                replies: resps[index].data,
              }));
              isOpenReply.value = new Array(comments.data.length).fill(false);
            });
        })
        .catch(() => comments.isError = true)
        .finally(() => comments.isLoading = false);

      if (!user.value) return;
      api.Exam.getVote(props.data.docId)
        .then((resp) => score.value = resp.data.score);
    }

    fetchData();

    return {
      comments,
      score,
      isOpenReply,
      createComment(replyId: number, content: string, cb: any) {
        api.Comment.create({ replyId, content })
          .then(() => {
            cb();
            fetchData();
          })
          .catch(() => alert('留言失敗了 QQ'))
      },
      voteExam(scoreValue: number) {
        if (!user.value) {
          alert('請先登入！');
          return;
        }
        api.Exam.vote(props.data.docId, scoreValue)
          .then(() => score.value = scoreValue === score.value ? 0 : scoreValue)
          .catch(() => alert('評分失敗了 QQ'));
      },
      isOpen,
      openModal() {
        isOpen.value = true;
      },
      closeModal() {
        isOpen.value = false;
      },
    };
  },
});
</script>
