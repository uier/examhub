<template>
  <div class="pl-3 border-l-4 border-rose-200">
    <div>
      <span class="text-sm font-medium-text-gray-">{{ name }}</span>
      <span class="text-xs text-gray-500 ml-4">{{ dayjs(createTime).format('YYYY-MM-DD HH:mm') }}</span>
    </div>
    <div class="text-sm font-regular text-gray-700">
      <p class="whitespace-pre-line">{{ content }}</p>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
export default {
  props: ['name', 'createTime', 'content'],
  setup: () => ({ dayjs }),
}
</script>
