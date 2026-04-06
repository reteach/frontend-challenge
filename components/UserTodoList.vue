<template>
  <ul>
    <UserTodo v-for="todo in todos" :key="todo.id" :title="todo.title" :model-value="todo.completed" @update:modelValue="emit('updateTodoStatus', todo.id, $event)" />
  </ul>
</template>

<script setup lang="ts">
const props = defineProps<{
  todos: any[];
}>()

const emit = defineEmits<{
  (e: 'updateTodoStatus', id: string, value: boolean): void;
}>()
</script>
