<template>
  <div>
    <button
      v-if="btnText === '新增公告'"
      type="button"
      @click="openModal"
      class="pl-2 pr-3 py-2 text-blue-900 bg-blue-100 hover:bg-blue-200 border border-transparent rounded-md"
    >
      <div class="flex items-center">
        <PlusIcon class="w-6 h-6 mr-0.5" />
        {{ btnText }}
      </div>
    </button>
    <button
      v-else
      type="button"
      @click="openModal"
      class="text-blue-900 text-base"
    >
      {{ btnText }}
    </button>
    <Dialog as="div" :open="isOpen" @close="closeModal">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <DialogOverlay class="fixed inset-0 bg-gray-300 bg-opacity-50" />

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <div
            class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
          >
            <DialogTitle as="h3" class="text-lg text-gray-900">
              {{ btnText }}
            </DialogTitle>
            <div class="mt-2">
              <text-field v-model="data.title" label='標題' class="mt-2" />
              <label for="pin-ann" class="mt-2 block text-sm text-gray-700">置頂</label>
              <select
                v-model="data.pinned"
                id="pin-ann"
                class="h-8 w-full p-1 border border-gray-500 rounded"
              >
                <option :value="false">否</option>
                <option :value="true">是</option>
              </select>
              <text-area v-model="data.content" label='內容' class="mt-2" />
            </div>

            <div class="mt-4">
              <button
                type="button"
                class="px-4 py-2 text-sm text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200"
                @click="submit"
              >
                送出
              </button>
              <button
                type="button"
                class="ml-8 text-sm text-rose-500"
                @click="closeModal"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
} from '@headlessui/vue';
import { PlusIcon } from '@heroicons/vue/solid';
import TextField from '../UI/TextField.vue';
import TextArea from '../UI/TextArea.vue';

export default {
  name: 'CourseForm',
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    PlusIcon,
    TextField,
    TextArea,
  },
  props: {
    populateWith: {
      type: Object,
      default: () => ({
        title: '',
        content: '',
        pinned: false,
      }),
    },
  },
  setup(props, { emit }) {
    const isOpen = ref(false);
    const data = ref(null);
    const btnText = computed(() => {
      return props.populateWith.annId ? '編輯' : '新增' + '公告';
    });
    const router = useRouter();

    return {
      btnText,
      isOpen,
      data,
      submit() {
        const resolve = () => {
          router.go(0);
        };
        const reject = (error) => {
          console.log(error);
          alert(`${btnText}失敗`);
        };
        emit('submit', data.value, resolve, reject);
      },
      closeModal() {
        isOpen.value = false;
      },
      openModal() {
        data.value = Object.assign({}, props.populateWith);
        isOpen.value = true;
      },
    };
  },
}
</script>
