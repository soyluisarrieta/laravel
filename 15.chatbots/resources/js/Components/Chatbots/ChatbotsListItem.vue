<script setup>
import PrimaryButton from '@/Components/PrimaryButton.vue'
import SecondaryButton from '@/Components/SecondaryButton.vue'
import DangerButton from '@/Components/DangerButton.vue'
import dayjs from '@/Utils/dayjs'

defineProps({
  chatbot: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section
    class="border-gray-200 p-5 dark:border-gray-700"
    :aria-label="chatbot.name"
  >
    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <div class="text-gray-800 dark:text-gray-200">
          {{ chatbot.name }}
        </div>
        <div class="text-sm text-gray-500 dark:text-gray-400">
          {{ dayjs(chatbot.created_at).fromNow() }}
        </div>
      </div>
      <div class="mt-4 flex space-x-2 md:mt-0">
        <PrimaryButton href="/chatbots/1" aria-label="View Chatbot">
          Ver
        </PrimaryButton>
        <SecondaryButton href="/chatbots/1/edit" aria-label="Edit Chatbot">
          Editar
        </SecondaryButton>
        <DangerButton aria-label="Delete Chatbot"> Eliminar </DangerButton>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
