<template>
  <RouterLink
    :to="props.to"
    class="text-white p-2 w-full font-medium text-center bg-blue-500 rounded-md flex items-center justify-center"
  >
    <slot></slot>
  </RouterLink>
</template>

<script setup lang="ts">
interface Props {
  to: { name: string; params?: Record<string, string | number> };
}

const props = defineProps<Props>();
</script>
