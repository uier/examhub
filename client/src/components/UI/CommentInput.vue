<template>
  <div class="flex space-x-5">
    <div class="flex-1">
      <textarea
        v-model="value"
        class="border border-gray-800 rounded w-full p-2 text-sm h-16"
        placeholder="留言"
      />
    </div>
    <div>
      <button
        type="button"
        class="px-4 py-2 text-sm text-blue-900 bg-blue-100 border-transparent rounded-md hover:bg-blue-200"
        @click="$emit('submit', value)"
      >
        送出
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const value = ref('');
    return { value };
  }
}
</script>
