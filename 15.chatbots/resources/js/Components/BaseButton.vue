<script setup>
import { Link } from '@inertiajs/vue3'
import { computed } from 'vue'
import { twMerge } from 'tailwind-merge'

const props = defineProps({
  ariaLabel: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'submit',
  },
  class: {
    type: String,
    default: '',
  },
  defaultClasses: {
    type: String,
    default:
      'inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 disabled:opacity-50 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300',
  },
})
const mergedClasses = computed(() =>
  twMerge('space-x-2', props.defaultClasses, props.class)
)
</script>

<template>
  <Link v-if="href" :href="href" :class="mergedClasses" :aria-label="ariaLabel">
    <slot />
  </Link>
  <button v-else :type="type" :class="mergedClasses" :aria-label="ariaLabel">
    <slot />
  </button>
</template>
