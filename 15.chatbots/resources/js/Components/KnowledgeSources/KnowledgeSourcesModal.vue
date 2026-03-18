<script setup>
import { useForm } from '@inertiajs/vue3'
import DialogModal from '../DialogModal.vue'
import KnowledgeSourcesForm from './KnowledgeSourcesForm.vue'
import SecondaryButton from '../SecondaryButton.vue'
import PrimaryButton from '../PrimaryButton.vue'

const emit = defineEmits(['close'])

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  chatbotId: {
    type: String,
    required: true,
  },
})

const form = useForm({
  name: '',
  type: 'pdf',
  pdf: null,
  website: '',
})

const handleSubmit = () => {
  form.post(
    route('chatbots.knowledge-sources.store', { chatbot: props.chatbotId }),
    {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        emit('close')
        form.reset()
      },
    }
  )
}
</script>

<template>
  <DialogModal :show="show" @close="emit('close')">
    <template #title> Fuentes de Conocimiento </template>
    <template #content>
      <KnowledgeSourcesForm :form="form" />
    </template>
    <template #footer>
      <div class="flex w-full items-center justify-between">
        <SecondaryButton @click="emit('close')">Cerrar</SecondaryButton>
        <PrimaryButton @click="handleSubmit">Guardar</PrimaryButton>
      </div>
    </template>
  </DialogModal>
</template>
