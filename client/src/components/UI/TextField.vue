<template>
  <div>
    <label :for="`text-field-${label}`" class="block text-sm text-gray-700">{{ label }}</label>
    <input
      type="text"
      :id="`text-field-${label}`"
      class="h-8 w-full p-1 border border-gray-500 rounded"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'TextField',
  props: ['label', 'modelValue']
}
</script>
