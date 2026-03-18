<script setup>
defineProps({
  chatbot: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section :aria-label="chatbot.name">
    {{ chatbot.name }}
  </section>
</template>

<style scoped></style>
