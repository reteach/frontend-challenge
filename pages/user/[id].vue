<template>
  <AwesomeArticle>
    <h1>User Todo's</h1>
    <form>
      Filters:
      <span>
        <label for="status">Filter by Status</label>
        <select v-model="filters.status" id="status">
          <option value="">Default</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </span>
      <span>
        <label for="limit">Item Amount</label>
        <select v-model="filters.limit" id="limit">
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </span>
    </form>
    <UserTodoList :todos="filteredTodos" />
  </AwesomeArticle>
</template>

<script lang="ts" setup>
const route = useRoute();
const filters = reactive({
  status: "",
  limit: 10
})

const { data: todos } = useAsyncData(
  'user-todos',
  (_nuxtApp, { signal }) => $fetch(`https://jsonplaceholder.typicode.com/users/${route.params.id}/todos`, { signal }),
)

const filteredTodos = computed(() => {
  if(!todos.value) return [];
  const filterByStatus = todos.value.filter(todo => {
    if(!filters.status) return todo;
    if(filters.status === 'completed' && todo.completed) return todo;
    if(filters.status === 'pending' && !todo.completed) return todo;
  })

  return filterByStatus.slice(0, filters.limit);
});
</script>
