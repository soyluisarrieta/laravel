<script setup>
import TextInput from '@/Components/TextInput.vue'
import AppLayout from '@/Layouts/AppLayout.vue'
import { useForm } from '@inertiajs/vue3'
import { ref } from 'vue'
import ChatInput from '@/Components/Chats/ChatInput.vue'

const editing = ref(false)

const props = defineProps({
  chat: Object,
})

const form = useForm({
  name: props.chat.name,
})

const updateChatName = () => {
  form.patch(route('chats.update', props.chat.id), {
    preserveScroll: true,
    onSuccess: () => {
      editing.value = false
    },
    onError: () => {
      editing.value = false
      form.reset()
    },
  })
}
</script>

<template>
  <AppLayout :title="chat.name">
    <template #header>
      <TextInput
        v-if="editing"
        v-model="form.name"
        @blur="updateChatName"
        @keyup.enter="updateChatName"
        autofocus
        class="border-none bg-transparent p-0 text-xl font-semibold leading-tight text-gray-800 shadow-none ring-0 focus:shadow-none focus:ring-0 dark:bg-transparent dark:text-gray-200"
      />
      <h1
        v-else
        @dblclick="editing = true"
        class="p-0 text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200"
      >
        {{ chat.name }}
      </h1>
    </template>
    <div
      class="flex h-[calc(100vh-140px)] flex-col bg-gray-50 dark:bg-gray-900"
    >
      <div class="flex-1 overflow-y-auto p-6"></div>
      <ChatInput :chat="chat" />
    </div>
  </AppLayout>
</template>
