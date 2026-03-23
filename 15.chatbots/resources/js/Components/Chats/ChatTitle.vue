<script setup>
import { ref } from 'vue'
import { useForm } from '@inertiajs/vue3'
import TextInput from '@/Components/TextInput.vue'

const props = defineProps({
  chat: Object,
})

const editing = ref(false)

const form = useForm({
  name: props.chat.name,
})

const updateChatName = () => {
  form.patch(route('chats.update', props.chat.id), {
    preserveScroll: true,
    onSuccess: () => {
      editing.value = false
    },
    onError: () => {
      editing.value = false
      form.reset()
    },
  })
}
</script>

<template>
  <TextInput
    @blur="updateChatName"
    @keyup.enter="updateChatName"
    v-if="editing"
    v-model="form.name"
    autofocus
    class="border-none bg-transparent p-0 text-xl font-semibold leading-tight text-gray-800 shadow-none ring-0 focus:shadow-none focus:ring-0 dark:bg-transparent dark:text-gray-200"
  />
  <h1
    v-else
    @dblclick="editing = true"
    class="p-0 text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200"
  >
    {{ chat.name }}
  </h1>
</template>
