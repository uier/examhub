<template>
  <div>
    <button
      v-if="btnText === '新增考古題'"
      type="button"
      @click="openModal"
      class="py-2 w-32 btn-add"
    >
      <div class="flex items-center">
        <FilePlusIcon class="w-6 h-6 mr-0.5" />
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
            class="dialog-container"
          >
            <DialogTitle as="h3" class="text-lg text-gray-900">
              {{ btnText }}
            </DialogTitle>
            <div class="mt-2">
              <label for="select-course" class="block text-sm text-gray-700">課程名稱</label>
              <select
                v-model="data.courseId"
                id="select-course"
                class="h-8 w-full p-1 border border-gray-500 rounded"
              >
                <option :value="0">請選擇考古題所屬課程</option>
                <option
                  v-for="{ courseId, courseName } in courses"
                  :key="courseId"
                  :value="courseId"
                >{{ courseName }}</option>
              </select>
              <text-field v-model.number="data.year" label='學年度' class="mt-2" placeholder="例如：109、110" />
              <text-field v-model.number="data.semester" label='學期' class="mt-2" placeholder="例如：1、2" />
              <text-field v-model="data.title" label='標題' class="mt-2" placeholder="例如：「期中考」、「第一次小考」" />
              <text-area v-model="data.description" label='詳細資訊' class="mt-2" placeholder="補充說明這份考古題的其他內容" />
            </div>

            <div class="mt-4">
              <button
                type="button"
                class="btn-submit"
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
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
} from '@headlessui/vue';
import FilePlusIcon from '../Icon/FilePlusIcon.vue';
import TextField from '../UI/TextField.vue';
import TextArea from '../UI/TextArea.vue';
import { useRouter } from 'vue-router';
import { useStore } from '../../store';

export default {
  name: 'ExamForm',
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    FilePlusIcon,
    TextField,
    TextArea,
  },
  props: {
    courses: Array,
    populateWith: {
      type: Object,
      default: () => ({
        courseId: 0,
        year: null,
        semester: null,
        title: '',
        description: '',
      }),
    },
  },
  setup(props, { emit }) {
    const isOpen = ref(false);
    const data = ref(null);
    const btnText = computed(() => {
      return props.populateWith.docId ? '編輯' : '新增' + '考古題';
    });
    const router = useRouter();
    const store = useStore();
    const user = computed(() => store.state.user);

    return {
      btnText,
      isOpen,
      data,
      submit() {
        if (!data.value.courseId) {
          alert('請選擇課程');
          return;
        }
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
        if (!user.value) {
          alert('請先登入！');
          return;
        }
        data.value = Object.assign({}, props.populateWith);
        isOpen.value = true;
      },
    };
  },
}
</script>
