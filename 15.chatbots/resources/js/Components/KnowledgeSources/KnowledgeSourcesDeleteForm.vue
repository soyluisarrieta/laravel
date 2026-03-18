<script setup>
import { ref } from 'vue'
import ConfirmationModal from '../ConfirmationModal.vue'
import SecondaryButton from '../SecondaryButton.vue'
import DangerButton from '../DangerButton.vue'
import { useForm } from '@inertiajs/vue3'

const confirming = ref(false)

const props = defineProps({
  knowledgeSource: Object,
})

const form = useForm({})

const deleteKnowledgeSource = () => {
  const deleteRoute = route('chatbots.knowledge-sources.destroy', {
    chatbot: props.knowledgeSource.chatbot_id,
    knowledge_source: props.knowledgeSource.id,
  })

  form.delete(deleteRoute, {
    preserveScroll: true,
    onSuccess: () => (confirming.value = false),
  })
}
</script>

<template>
  <button v-bind="$attrs" @click="confirming = true">
    <slot />
  </button>
  <ConfirmationModal :show="confirming" @close="confirming = false">
    <template #title>Eliminar fuente: {{ knowledgeSource.name }}</template>
    <template #content>
      ¿Estás seguro de que deseas eliminar esta fuente de conocimiento?
    </template>
    <template #footer>
      <SecondaryButton aria-label="Cancelar" @click="confirming = false">
        Cancelar
      </SecondaryButton>
      <DangerButton
        class="ml-auto"
        aria-label="Eliminar"
        @click="deleteKnowledgeSource"
      >
        Eliminar
      </DangerButton>
    </template>
  </ConfirmationModal>
</template>
