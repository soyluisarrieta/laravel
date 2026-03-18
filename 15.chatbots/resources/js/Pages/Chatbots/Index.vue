<script setup>
import ChatbotsListItem from '@/Components/Chatbots/ChatbotsListItem.vue'
import AppLayout from '@/Layouts/AppLayout.vue'

defineProps({
  chatbots: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <AppLayout title="Chatbots">
    <template #header>
      <h2
        class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200"
      >
        Chatbots
      </h2>
    </template>

    <section class="py-12" aria-label="Chatbots List">
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div
          class="overflow-hidden bg-white shadow-xl sm:rounded-lg dark:bg-gray-800"
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
