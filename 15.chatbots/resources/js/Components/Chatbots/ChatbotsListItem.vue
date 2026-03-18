<script setup>
import DangerButton from '../DangerButton.vue'
import PrimaryButton from '../PrimaryButton.vue'
import SecondaryButton from '../SecondaryButton.vue'

defineProps({
  chatbot: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section
    class="border-gray-200 p-5 text-gray-800 dark:border-gray-700 dark:text-gray-200"
    :aria-label="chatbot.name"
  >
    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <div>{{ chatbot.name }}</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">
          {{ chatbot.created_at }}
        </div>
      </div>
      <div class="mt-4 flex space-x-2 md:mt-0">
        <PrimaryButton>View</PrimaryButton>
        <SecondaryButton>Edit</SecondaryButton>
        <DangerButton>Delete</DangerButton>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
