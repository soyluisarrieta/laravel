<script setup>
import { XCircleIcon } from '@heroicons/vue/24/solid'
import { onMounted, ref } from 'vue'

defineProps({
  modelValue: Object,
})

const emit = defineEmits(['update:modelValue'])

const input = ref(null)

onMounted(() => {
  if (input.value.hasAttribute('autofocus')) {
    input.value.focus()
  }
})

defineExpose({ focus: () => input.value.focus() })

const clearFile = () => {
  input.value.value = null
  emit('update:modelValue', null)
}
</script>

<template>
  <div class="relative flex items-center justify-between">
    <input
      ref="input"
      type="file"
      v-bind="$attrs"
      class="filer:rounded rounded-md border border-gray-300 pr-8 shadow-sm file:mr-2 file:cursor-pointer file:border-none file:bg-gray-200 file:px-3 file:py-2 file:text-gray-800 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 file:dark:bg-gray-700 file:dark:text-white dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
      @input="$emit('update:modelValue', $event.target.files[0])"
    />
    <button
      v-if="modelValue"
      class="text-white-500 dark:text-white-700 absolute right-2 top-3"
      type="button"
      @click="clearFile"
    >
      <XCircleIcon class="size-5" />
    </button>
  </div>
</template>
