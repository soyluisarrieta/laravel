<script setup>
import { Link, usePoll } from '@inertiajs/vue3'
import {
  PencilIcon,
  ArrowUturnLeftIcon,
  ChatBubbleBottomCenterIcon,
  BookOpenIcon,
} from '@heroicons/vue/24/solid'
import SecondaryButton from '@/Components/SecondaryButton.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import { ref } from 'vue'
import AppLayout from '@/Layouts/AppLayout.vue'
import dayjs from '@/Utils/dayjs'
import KnowledgeSourcesModal from '@/Components/KnowledgeSources/KnowledgeSourcesModal.vue'

const showModal = ref(false)

usePoll(5000)

defineProps({
  chatbot: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <AppLayout :title="`Chatbot: ${chatbot.name}`">
    <template #header>
      <h1
        class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200"
      >
        Detalle del Chatbot
      </h1>
    </template>

    <section class="py-6" aria-label="Chatbot">
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Link
          :href="route('chatbots.index')"
          class="mb-6 flex items-center space-x-2 px-4 text-sm text-gray-600 hover:underline dark:text-gray-400"
          aria-label="Volver al listado"
        >
          <ArrowUturnLeftIcon class="size-4" />
          <span>Volver al listado</span>
        </Link>
        <div class="overflow-hidden rounded-lg shadow-lg">
          <section class="bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <div
              class="flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <!-- Información principal del chatbot -->
              <div class="space-y-4">
                <h2
                  class="text-lg font-extrabold leading-5 text-gray-800 md:text-2xl dark:text-gray-200"
                >
                  {{ chatbot.name }}
                </h2>
                <div>
                  <span
                    class="text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    System Prompt:
                  </span>
                  <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {{ chatbot.system_prompt }}
                  </p>
                </div>
                <div class="flex flex-wrap gap-4">
                  <div class="flex items-center">
                    <span
                      class="text-sm font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Temperatura:
                    </span>
                    <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      {{ chatbot.temperature }}
                    </span>
                  </div>
                  <div class="flex items-center">
                    <span
                      class="text-sm font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Modelo:
                    </span>
                    <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      {{ chatbot.model }}
                    </span>
                  </div>
                  <div class="flex items-center">
                    <span
                      class="text-sm font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Creación:
                    </span>
                    <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      {{ dayjs(chatbot.created_at).format('DD-MMM-YYYY') }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Botones de acción -->
              <div class="mt-6 flex gap-3 md:mt-0">
                <SecondaryButton
                  :href="route('chatbots.edit', chatbot.id)"
                  aria-label="Edit Chatbot"
                >
                  <PencilIcon class="size-3"></PencilIcon>
                  <span>Editar</span>
                </SecondaryButton>
                <PrimaryButton aria-label="Chat with Chatbot">
                  <ChatBubbleBottomCenterIcon class="size-3" />
                  <span>Chat</span>
                </PrimaryButton>
                <PrimaryButton
                  aria-label="Chat with Chatbot"
                  @click="showModal = true"
                >
                  <BookOpenIcon class="size-3" />
                  <span>Conocimiento</span>
                </PrimaryButton>
              </div>
            </div>
          </section>
        </div>
      </div>
      <KnowledgeSourcesModal
        :show="showModal"
        :chatbot-id="chatbot.id"
        @close="showModal = false"
      />
    </section>
  </AppLayout>
</template>

<style scoped></style>
