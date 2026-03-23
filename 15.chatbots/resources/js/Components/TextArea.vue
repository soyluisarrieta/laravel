<script setup>
import autosize from 'autosize'
import { onMounted, ref } from 'vue'

defineProps({
  modelValue: String,
})

defineEmits(['update:modelValue'])

const textarea = ref(null)

onMounted(() => {
  if (textarea.value.hasAttribute('autofocus')) {
    textarea.value.focus()
  }
  autosize(textarea.value)
})

defineExpose({ focus: () => textarea.value.focus() })

const handleEnterPressed = event => {
  if (event.shiftKey) return

  event.preventDefault()

  event.target.form.dispatchEvent(new Event('submit'))
}
</script>

<template>
  <textarea
    ref="textarea"
    class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
    :value="modelValue"
    @keydown.enter="handleEnterPressed"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
