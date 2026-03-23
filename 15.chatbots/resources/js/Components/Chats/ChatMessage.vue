<script setup>
import dayjs from '@/Utils/dayjs.js'

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
})
const isUser = props.message.role === 'user'
</script>

<template>
  <div class="flex w-full" :class="isUser ? 'justify-end' : 'justify-start'">
    <div class="space-y-1">
      <div
        class="whitespace-pre-wrap break-words rounded-lg px-4 py-2 text-sm shadow-sm"
        :class="
          isUser
            ? 'rounded-tr-none bg-indigo-600 text-indigo-50'
            : 'rounded-tl-none bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200'
        "
      >
        <slot v-if="!message.content" />
        <span v-else>{{ message.content }}</span>
      </div>
      <div
        class="px-1 text-xs text-gray-500 dark:text-gray-400"
        :class="isUser ? 'text-right' : 'text-left'"
      >
        {{ dayjs(message.created_at).format('HH:mm') }}
      </div>
    </div>
  </div>
</template>
