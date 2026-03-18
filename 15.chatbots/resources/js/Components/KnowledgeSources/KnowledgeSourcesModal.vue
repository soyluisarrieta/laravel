<script setup>
import { useForm } from '@inertiajs/vue3'
import DialogModal from '../DialogModal.vue'
import KnowledgeSourcesForm from './KnowledgeSourcesForm.vue'

const emit = defineEmits(['close'])

defineProps({
  show: {
    type: Boolean,
    required: true,
  },
})

const form = useForm({
  name: '',
  type: 'pdf',
  pdf: null,
  website: '',
})
</script>

<template>
  <DialogModal :show="show" @close="emit('close')">
    <template #title> Fuentes de Conocimiento </template>
    <template #content>
      <KnowledgeSourcesForm :form="form" />
    </template>
    <template #footer> botones </template>
  </DialogModal>
</template>
