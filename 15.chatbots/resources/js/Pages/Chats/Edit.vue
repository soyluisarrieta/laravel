<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import ChatInput from '@/Components/Chats/ChatInput.vue'
import ChatMessage from '@/Components/Chats/ChatMessage.vue'
import ChatTitle from '@/Components/Chats/ChatTitle.vue'
import { nextTick, ref, useTemplateRef } from 'vue'
import { useStream } from '@laravel/stream-vue'
import { createParser } from 'eventsource-parser'

const props = defineProps({
  chat: Object,
  messages: Array,
})

const chatContainer = useTemplateRef('chatContainer')
const assistantMessage = ref('')
const scrollToBottom = () => {
  chatContainer.value.scrollTo({
    top: chatContainer.value.scrollHeight,
    behavior: 'smooth',
  })
}

const streamUrl = route('chats.messages.store', {
  chat: props.chat.id,
})

const parser = createParser({
  onEvent: event => {
    const text = JSON.parse(event.data).delta
    if (text !== undefined) {
      assistantMessage.value += text
    }
  },
})

const { send, isFetching, isStreaming } = useStream(streamUrl, {
  onData: data => {
    parser.feed(data)
  },
  onFinish: () => {
    props.messages.push({
      content: assistantMessage.value,
      role: 'assistant',
      created_at: new Date(),
    })
    assistantMessage.value = ''
    scrollToBottom()
  },
})

const sendMessage = async message => {
  props.messages.push({
    content: message,
    role: 'user',
    created_at: new Date(),
  })

  await nextTick()

  scrollToBottom()

  send({ message })
}
</script>

<template>
  <AppLayout :title="chat.name">
    <template #header>
      <ChatTitle :chat="chat" />
    </template>
    <div
      class="flex h-[calc(100vh-140px)] flex-col bg-gray-100 dark:bg-gray-900"
    >
      <div
        ref="chatContainer"
        class="mx-auto max-w-7xl flex-1 overflow-y-auto p-6"
      >
        <ChatMessage
          :message="message"
          v-if="messages.length > 0"
          v-for="message in messages"
          :key="message.id"
        />
        <ChatMessage
          v-if="assistantMessage"
          :message="{
            role: 'assistant',
            content: assistantMessage,
            created_at: new Date(),
          }"
        />
      </div>
      <ChatInput @messageSent="sendMessage" :chat="chat" />
    </div>
  </AppLayout>
</template>
