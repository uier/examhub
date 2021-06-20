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

            <div class="mt-2 mb-4 text-xs">
              <div class="text-gray-500">
                Posted on: <span class="text-gray-800">{{ data.createTime }}</span>
              </div>
              <div class="text-gray-500">
                Posted by: <span class="text-gray-800">{{ data.userId }}</span>
              </div>
            </div>

            <div class="mt-2">
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
              v-for="{ comId, userId, content, createTime, replies } in comments.data"
              :key="comId"
            >
              <CommentItem
                class="m-2"
                :name="userId"
                :content="content"
                :createTime="createTime"
              />
              <CommentItem
                v-for="reply in replies"
                :key="reply.comId"
                class="m-2 ml-10"
                :name="reply.userId"
                :content="reply.content"
                :createTime="reply.createTime"
              />
            </template>

            <CommentInput @submit="(...args) => createComment(data.docId, ...args)" />

          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script lang='ts'>
import { ref, reactive, defineComponent } from 'vue';
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
} from '@headlessui/vue';
import { XIcon } from '@heroicons/vue/solid';
import TextArea from '../UI/TextArea.vue';
import CommentItem from '../UI/CommentItem.vue';
import CommentInput from '../UI/CommentInput.vue';
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
  },
  props: ['data'],
  setup(props) {
    const comments = reactive({
      data: [] as Comment.Info[],
      isLoading: true,
      isError: false,
    });
    const isOpen = ref(false);

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
            });
        })
        .catch(() => comments.isError = true)
        .finally(() => comments.isLoading = false);
    }

    fetchData();

    return {
      comments,
      createComment(replyId: number, content: string, cb: any) {
        api.Comment.create({ replyId, content })
          .then(() => {
            cb();
            fetchData();
          })
          .catch(() => alert('留言失敗了 QQ'))
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
