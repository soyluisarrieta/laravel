<script setup>
import dayjs from '@/Utils/dayjs'
import {
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/vue/24/solid'

defineProps({
  knowledgeSource: Object,
})
</script>

<template>
  <div
    class="grid grid-cols-12 gap-3 p-2 text-gray-700 even:bg-gray-100/40 hover:bg-gray-100/80 dark:text-gray-200 even:dark:bg-gray-900/40 hover:dark:bg-gray-900/80"
  >
    <div class="col-span-3">{{ knowledgeSource.name }}</div>
    <div class="col-span-3">
      <a
        class="flex items-center space-x-2 underline underline-offset-4"
        href="#"
      >
        <span>{{ knowledgeSource.type }}</span>
        <ArrowTopRightOnSquareIcon class="size-4" />
      </a>
    </div>
    <div class="col-span-1">
      <CheckIcon
        v-if="knowledgeSource.extracted_content"
        class="size-4 text-green-500"
      />
      <ArrowPathIcon v-else class="size-4 animate-spin text-orange-500" />
    </div>
    <div class="col-span-4">
      {{ dayjs(knowledgeSource.created_at).format('DD-MMM-YYYY') }}
    </div>
    <div class="col-span-1">
      <XMarkIcon class="size-4 text-red-500" />
    </div>
  </div>
</template>
