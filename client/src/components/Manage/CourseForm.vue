<template>
  <div>
    <button
      v-if="btnText === '新增課程'"
      type="button"
      @click="openModal"
      class="py-2 btn-add"
    >
      <div class="flex items-center">
        <FolderPlusIcon class="w-6 h-6 mr-0.5" />
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
              <text-field v-model="data.courseName" label='課程名稱' class="mt-2" />
              <text-field v-model="data.deptName" label='所屬系所' class="mt-2" />
              <text-field v-model="data.category" label='所屬分類' class="mt-2" />
              <text-area v-model="data.description" label='詳細資訊' class="mt-2" />
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
import { useRouter } from 'vue-router';
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
} from '@headlessui/vue';
import FolderPlusIcon from '../Icon/FolderPlusIcon.vue';
import TextField from '../UI/TextField.vue';
import TextArea from '../UI/TextArea.vue';

export default {
  name: 'CourseForm',
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    FolderPlusIcon,
    TextField,
    TextArea,
  },
  props: {
    populateWith: {
      type: Object,
      default: () => ({
        courseName: '',
        deptName: '',
        category: '',
        description: '',
      }),
    },
  },
  setup(props, { emit }) {
    const isOpen = ref(false);
    const data = ref(null);
    const btnText = computed(() => {
      return props.populateWith.courseId ? '編輯' : '新增' + '課程';
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
          alert(`${btnText}失敗了 QQ`);
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
