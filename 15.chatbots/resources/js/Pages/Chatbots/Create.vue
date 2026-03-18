<script setup>
import { Link } from '@inertiajs/vue3'
import { ArrowUturnLeftIcon } from '@heroicons/vue/24/solid'
import AppLayout from '@/Layouts/AppLayout.vue'
import FormSection from '@/Components/FormSection.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import ChatbotsForm from '@/Components/Chatbots/ChatbotsForm.vue'
import { createform, store } from '@/Forms/chatbot'

const props = defineProps({
  chatbot: {
    type: Object,
    required: true,
  },
})

const form = createform(props.chatbot)

const handleSubmit = () => {
  store(form)
}
</script>

<template>
  <AppLayout :title="`Crear Chatbot`">
    <template #header>
      <h1
        class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200"
      >
        Crear Chatbot
      </h1>
    </template>

    <section class="py-6" aria-label="Crear Chatbot">
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Link
          :href="route('chatbots.index')"
          class="mb-6 flex items-center space-x-2 px-4 text-sm text-gray-600 hover:underline dark:text-gray-400"
          aria-label="Volver al listado"
        >
          <ArrowUturnLeftIcon class="size-4" />
          <span>Volver al listado</span>
        </Link>
        <FormSection @submitted="handleSubmit">
          <template #title>Crear Chatbot</template>
          <template #description> Crea un nuevo chatbot. </template>
          <template #form>
            <ChatbotsForm :form="form" />
          </template>
          <template #actions>
            <PrimaryButton
              aria-label="Crear Chatbot"
              :class="{ 'cursor-not-allowed opacity-50': form.processing }"
              :disabled="form.processing"
            >
              Crear Chatbot
            </PrimaryButton>
          </template>
        </FormSection>
      </div>
    </section>
  </AppLayout>
</template>

<style scoped></style>
