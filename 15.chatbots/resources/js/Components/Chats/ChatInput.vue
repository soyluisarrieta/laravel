<script setup>
import TextArea from '@/Components/TextArea.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import { PaperAirplaneIcon } from '@heroicons/vue/24/solid'
import { useForm } from '@inertiajs/vue3'

const props = defineProps({
  chat: {
    type: Object,
    required: true,
  },
})

const form = useForm({
  message: '',
})

const handleSubmit = () => {
  form.post(
    route('messages.store', {
      chat: props.chat.id,
    })
  )
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
      <div class="flex items-center justify-end pt-2">
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
