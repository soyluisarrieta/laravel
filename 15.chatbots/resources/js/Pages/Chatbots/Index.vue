<script setup>
import ChatbotsListItem from '@/Components/Chatbots/ChatbotsListItem.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import AppLayout from '@/Layouts/AppLayout.vue'
import { PlusIcon } from '@heroicons/vue/24/outline'

defineProps({
  chatbots: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <AppLayout title="Listado de Chatbots">
    <template #header>
      <div class="flex items-center justify-between">
        <h1
          class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200"
        >
          Chatbots
        </h1>
        <PrimaryButton
          aria-label="Crear Chatbot"
          :href="route('chatbots.create')"
        >
          <PlusIcon class="size-4" />
          <span>Crear Chatbot</span>
        </PrimaryButton>
      </div>
    </template>

    <section class="py-12" aria-label="Chatbots List">
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div
          class="divide-y overflow-hidden bg-white shadow-xl sm:rounded-lg dark:bg-gray-800"
        >
          <ChatbotsListItem
            v-for="chatbot in chatbots"
            :key="chatbot.id"
            :chatbot="chatbot"
          />
        </div>
      </div>
    </section>
  </AppLayout>
</template>
