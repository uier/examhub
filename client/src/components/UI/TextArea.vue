<template>
  <div>
    <label :for="`text-area-${label}`" class="block text-sm text-gray-700">{{ label }}</label>
    <textarea
      :id="`text-area-${label}`"
      class="h-32 w-full p-1 border border-gray-500 rounded"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'TextArea',
  props: ['label', 'modelValue', 'placeholder']
}
</script>
