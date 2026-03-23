<script setup>
import TextArea from '@/Components/TextArea.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import { PaperAirplaneIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <div
    class="border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
  >
    <form class="mx-auto max-w-7xl">
      <TextArea rows="1" class="w-full py-3" />
      <div class="flex items-center justify-end pt-2">
        <PrimaryButton class="p-1" aria-label="Enviar mensaje">
          <PaperAirplaneIcon class="size-6" />
        </PrimaryButton>
      </div>
    </form>
  </div>
</template>
