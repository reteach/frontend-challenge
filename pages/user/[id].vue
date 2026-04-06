<template>
  <AwesomeArticle>
    <h1>User Todo's</h1>
    <form>
      Filters:
      <span>
        <label for="change-multiple">All {{ allItemsChecked ? 'completed' : 'pending' }}</label>
        <input v-model="allItemsChecked" id="change-multiple" type="checkbox" />
      </span>
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
    <UserTodoList :todos="filteredTodos" @updateTodoStatus="updateTodoStatus" />
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

const allItemsChecked = computed({
  get: () => {
    return filteredTodos.value.every(todo => todo.completed);
  },
  set: (value) => {
    for (let i = 0; i < todos.value.length; i++) {
      const todo = todos.value[i];
      todo.completed = value;
    }
  }
});

const updateTodoStatus = (id: string, value: boolean) => {
  const index = todos.value.findIndex(todo => todo.id === id);
  todos.value[index].completed = value;
};
</script>
