import { useForm } from '@inertiajs/vue3'

export const createform = (chatbot = {}) =>
  useForm({
    name: chatbot.name,
    system_prompt: chatbot.system_prompt,
    model: chatbot.model,
    temperature: String(chatbot.temperature),
  })

export const store = (form, options = {}) =>
  form.post(route('chatbots.store'), options)

export const update = (form, chatbotId, options = {}) =>
  form.put(route('chatbots.update', chatbotId), {
    preserveScroll: true,
    ...options,
  })
