<script setup>
import DialogModal from '../DialogModal.vue'

const emit = defineEmits(['close'])

defineProps({
  show: {
    type: Boolean,
    required: true,
  },
})

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <DialogModal :show="show" @close="closeModal">
    <template #title> Fuentes de Conocimiento </template>
    <template #content>
      <p>Contenido del modal</p>
    </template>
    <template #footer> botones </template>
  </DialogModal>
</template>
