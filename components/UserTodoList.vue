<template>
  <ul>
    <UserTodoListItem
      v-for="todo in todos"
      :key="todo.id"
      :title="todo.title"
      :model-value="todo.completed"
      @update:modelValue="emit('updateTodoStatus', todo.id, $event)"
    />
  </ul>
</template>

<script setup lang="ts">
import type { UserTodo } from "~/types";

const props = defineProps<{
  todos: UserTodo[];
}>();

const emit = defineEmits<{
  (e: "updateTodoStatus", id: number, value: boolean): void;
}>();
</script>
