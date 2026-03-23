<script setup>
import PrimaryButton from '@/Components/PrimaryButton.vue'
import AppLayout from '@/Layouts/AppLayout.vue'
import {
  ArrowTopRightOnSquareIcon,
  ChatBubbleBottomCenterIcon,
  TrashIcon,
} from '@heroicons/vue/24/solid'
import { Link } from '@inertiajs/vue3'

defineProps({
  chatbot: {
    type: Object,
    required: true,
  },
  chats: {
    type: {
      type: Array,
      required: true,
    },
  },
})
</script>
<template>
  <AppLayout :title="chatbot.name">
    <template #header>
      <div class="flex items-center justify-between">
        <h1
          class="p-0 text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200"
        >
          {{ chatbot.name }}
        </h1>
        <PrimaryButton
          method="POST"
          :href="route('chats.store', { chatbot_id: chatbot.id })"
          aria-label="Crear chat"
        >
          <ChatBubbleBottomCenterIcon class="size-3" />
          <span>Nuevo chat</span>
        </PrimaryButton>
      </div>
    </template>

    <section class="py-6" aria-label="Chats">
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="overflow-hidden rounded-lg shadow-lg">
          <section class="bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <div
              v-if="chats.length > 0"
              class="grid grid-cols-12 gap-3 p-2 even:bg-gray-100/30 hover:bg-gray-100 dark:even:bg-gray-900/30 dark:hover:bg-gray-900"
              v-for="chat in chats"
              :key="chat.id"
            >
              <div class="col-span-6 text-gray-700 dark:text-gray-300">
                <a
                  class="flex items-center space-x-2 underline underline-offset-4"
                  target="_blank"
                  :href="
                    route('chats.edit', {
                      chat: chat.id,
                    })
                  "
                >
                  <ArrowTopRightOnSquareIcon class="size-4" />
                  <span>{{ chat.name }}</span>
                </a>
              </div>
              <div class="col-span-6 flex items-center">
                <Link
                  method="DELETE"
                  preserve-scroll
                  :href="
                    route('chats.destroy', {
                      chat: chat.id,
                    })
                  "
                >
                  <TrashIcon class="size-4 text-red-600" />
                </Link>
              </div>
            </div>
            <div class="flex items-center justify-center" v-else>
              <PrimaryButton
                method="POST"
                :href="route('chats.store', { chatbot_id: chatbot.id })"
                aria-label="Crear chat"
              >
                <ChatBubbleBottomCenterIcon class="size-3" />
                <span>Empieza tu primer chat</span>
              </PrimaryButton>
            </div>
          </section>
        </div>
      </div>
    </section>
  </AppLayout>
</template>
