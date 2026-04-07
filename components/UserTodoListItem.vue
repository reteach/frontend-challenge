<template>
  <li>
    <h4>{{ title }}</h4>
    <input v-model="model" type="checkbox" :id="`todo-status-${id}`" />
    <label :for="`todo-status-${id}`">{{ model ? 'Completed' : 'Pending' }}</label>
  </li>
</template>

<script setup lang="ts">
  const props = defineProps<{
    title: string;
  }>()

  const model = defineModel()

  const id = useId();
</script>
