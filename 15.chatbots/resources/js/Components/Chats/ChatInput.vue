<script setup>
import TextArea from '@/Components/TextArea.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import { PaperAirplaneIcon } from '@heroicons/vue/24/solid'
import { useForm } from '@inertiajs/vue3'
import InputError from '../InputError.vue'

const props = defineProps({
  chat: {
    type: Object,
    required: true,
  },
})

const form = useForm({
  message: '',
})

const emit = defineEmits(['messageSent'])

const handleSubmit = () => {
  emit('messageSent', form.message)
  form.reset()

  // form.post(
  //   route('chats.messages.store', {
  //     chat: props.chat.id,
  //   }),
  //   {
  //     preserveScroll: true,
  //     onSuccess: () => {
  //       form.reset()
  //     },
  //   }
  // )
}
</script>

<template>
  <div
    class="border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
  >
    <form @submit.prevent="handleSubmit" class="mx-auto max-w-7xl">
      <TextArea
        v-model="form.message"
        rows="1"
        class="w-full py-3"
        :disabled="form.processing"
        autofocus
        placeholder="Escribe un mensaje..."
      />
      <div class="flex items-center justify-end space-x-4 pt-2">
        <InputError :message="form.errors.message" />
        <PrimaryButton
          class="p-1"
          aria-label="Enviar mensaje"
          :disabled="form.processing"
        >
          <PaperAirplaneIcon class="size-6" />
        </PrimaryButton>
      </div>
    </form>
  </div>
</template>
