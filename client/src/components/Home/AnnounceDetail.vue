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
          <div class="inline-block w-full md:max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
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
                Posted on: {{ data.createTime }}
              </div>
              <div class="text-gray-500">
                Posted by: {{ data.name }}
              </div>
            </div>

            <div class="mt-2">
              <p class="whitespace-pre-line">{{ data.content }}</p>
            </div>

            <div class="mt-4 mb-2 text-gray-500 text-xs">
              Last updated on: {{ data.lastUpdateTime }}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { ref } from 'vue';
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
} from '@headlessui/vue';
import { XIcon } from '@heroicons/vue/solid';

export default {
  name: 'AnnounceDetail',
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    XIcon,
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
