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
          <div
            class="inline-block w-full md:max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
          >
            <DialogTitle as="h3" class="text-lg font-medium text-center text-gray-900">
              {{ data.title }}
            </DialogTitle>

            <div class="mt-2 mb-4 text-xs">
              <div class="text-gray-500">
                Posted on: <span class="text-gray-800">{{ data.createTime }}</span>
              </div>
              <div class="text-gray-500">
                Posted by: <span class="text-gray-800">{{ data.name }}</span>
              </div>
            </div>

            <div class="mt-2">
              <p class="whitespace-pre-line">{{ data.content }}</p>
            </div>

            <div class="mt-4 mb-2 text-gray-500 text-xs">
              Last updated on: <span class="text-gray-800">{{ data.lastUpdateTime }}</span>
            </div>

            <div class="mt-4">
              <button
                type="button"
                class="px-4 py-2 text-sm text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200"
                @click="closeModal"
              >
                關閉
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

export default {
  name: 'AnnounceDetail',
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
  },
  props: ['data'],
  setup() {
    const isOpen = ref(false);

    return {
      isOpen,
      openModal() {
        isOpen.value = true;
      },
      closeModal() {
        isOpen.value = false;
      },
    };
  },
}
</script>
