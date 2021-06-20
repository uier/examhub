<template>
  <div class="flex space-x-5">
    <div class="flex-1">
      <textarea
        v-model="value"
        class="border border-gray-800 rounded-lg w-full p-2 text-sm"
        placeholder="留言"
        ref="commentInput"
        :rows="1"
        @keyup="resize"
      />
    </div>
    <div>
      <button
        type="button"
        class="px-4 py-2 text-sm text-blue-900 bg-blue-100 border-transparent rounded-md hover:bg-blue-200"
        @click="$emit('submit', value, () => value = '')"
      >
        送出
      </button>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
  setup() {
    const value = ref('');
    const commentInput = ref(null);

    return {
      value,
      commentInput,
      resize() {
        commentInput.value.style.cssText = 'height: auto;';
        commentInput.value.style.cssText = `height: ${commentInput.value.scrollHeight}px;`;
      },
    };
  }
}
</script>
