<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <h4>{{ todo.title }}</h4>
      <p>Status: {{ todo.completed ? 'Completed' : 'Pending' }}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps<{
  todos: any[];
}>()
</script>
