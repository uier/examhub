<template>
  <div class="flex space-x-5">
    <div class="flex-1">
      <textarea
        v-model="value"
        class="border border-gray-800 rounded-lg w-full p-2 text-sm resize-none"
        :placeholder="!user ? '請先登入' : '留言'"
        :disabled="!user"
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
import { ref, computed } from 'vue';
import { useStore } from '../../store';

export default {
  setup() {
    const value = ref('');
    const commentInput = ref(null);
    const store = useStore();
    const user = computed(() => store.state.user);

    return {
      value,
      commentInput,
      user,
      resize() {
        commentInput.value.style.cssText = 'height: auto;';
        commentInput.value.style.cssText = `height: ${commentInput.value.scrollHeight}px;`;
      },
    };
  }
}
</script>
