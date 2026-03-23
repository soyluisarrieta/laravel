<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import ChatInput from '@/Components/Chats/ChatInput.vue'
import ChatMessage from '@/Components/Chats/ChatMessage.vue'
import ChatTitle from '@/Components/Chats/ChatTitle.vue'

const props = defineProps({
  chat: Object,
  messages: Array,
})
</script>

<template>
  <AppLayout :title="chat.name">
    <template #header>
      <ChatTitle :chat="chat" />
    </template>
    <div
      class="flex h-[calc(100vh-140px)] flex-col bg-gray-100 dark:bg-gray-900"
    >
      <div class="mx-auto max-w-7xl flex-1 overflow-y-auto p-6">
        <ChatMessage
          :message="message"
          v-if="messages.length > 0"
          v-for="message in messages"
          :key="message.id"
        />
      </div>
      <ChatInput :chat="chat" />
    </div>
  </AppLayout>
</template>
