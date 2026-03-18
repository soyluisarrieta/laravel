<script setup>
import { Link, useForm } from '@inertiajs/vue3'
import { ArrowUturnLeftIcon } from '@heroicons/vue/24/solid'
import AppLayout from '@/Layouts/AppLayout.vue'
import FormSection from '@/Components/FormSection.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import ActionMessage from '@/Components/ActionMessage.vue'
import ChatbotsForm from '@/Components/Chatbots/ChatbotsForm.vue'

const props = defineProps({
  chatbot: {
    type: Object,
    required: true,
  },
})

const form = useForm({
  name: props.chatbot.name || '',
  system_prompt: props.chatbot.system_prompt || '',
  model: props.chatbot.model || '',
  temperature: String(props.chatbot.temperature) || '0.7',
})

const handleSubmit = () => {
  form.put(route('chatbots.update', props.chatbot.id))
}
</script>

<template>
  <AppLayout :title="`Editar Chatbot: ${chatbot.name}`">
    <template #header>
      <h1
        class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200"
      >
        Chatbot: {{ chatbot.name }}
      </h1>
    </template>

    <section class="py-6" aria-label="Editar Chatbot">
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
          <template #title>Editar Chatbot</template>
          <template #description> Edita la información del chatbol. </template>
          <template #form>
            <ChatbotsForm :form="form" />
          </template>
          <template #actions>
            <ActionMessage :on="false" class="me-3">
              Actualizado.
            </ActionMessage>

            <PrimaryButton
              aria-label="Guardar Chatbot"
              :class="{ 'cursor-not-allowed opacity-50': false }"
              :disabled="false"
            >
              Guardar
            </PrimaryButton>
          </template>
        </FormSection>
      </div>
    </section>
  </AppLayout>
</template>

<style scoped></style>
