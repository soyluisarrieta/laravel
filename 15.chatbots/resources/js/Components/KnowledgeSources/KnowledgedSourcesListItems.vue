<script setup>
defineProps({
  knowledgeSource: Object,
})
</script>

<template>
  <div>
    {{ knowledgeSource.name }}
  </div>
</template>
