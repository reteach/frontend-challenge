<template>
  <AwesomeArticle>
    <h1>User Todo's</h1>
    <div>
      Filters:
      <span>
        <label for="completed">Show completed</label>
        <input type="checkbox" id="completed" v-model="showCompleted" />
      </span>
      <span>
        <label for="pending">Show pending</label>
        <input type="checkbox" id="pending" v-model="showPending" />
      </span>
    </div>
    <div>
      Sort by status:
      <span>
        <label for="completed">Completed first</label>
        <input
          type="radio"
          id="sort-completed"
          value="completed"
          v-model="sortBy"
        />
      </span>
      <span>
        <label for="pending">Pending first</label>
        <input
          type="radio"
          id="sort-pending"
          value="pending"
          v-model="sortBy"
        />
      </span>
      <span>
        <button @click="sortBy = null" :disabled="!sortBy">Clear sort</button>
      </span>
    </div>
    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id">
        <h4>{{ todo.title }}</h4>
        <p>Status: {{ todo.completed ? "Completed" : "Pending" }}</p>
      </li>
    </ul>
  </AwesomeArticle>
</template>

<script setup>
const route = useRoute()

const { data: todos } = useAsyncData(() =>
  fetch(
    `https://jsonplaceholder.typicode.com/users/${route.params.id}/todos`
  ).then((res) => res.json())
)

const showCompleted = ref(true)
const showPending = ref(true)

const sortBy = ref(null) // default sort

const filteredTodos = computed(() => {
  if (!todos.value) return []

  let result = todos.value.filter((todo) => {
    if (showCompleted.value && todo.completed) return true
    if (showPending.value && !todo.completed) return true
    return false
  })

  if (!sortBy.value) return result

  return [...result].sort((a, b) => {
    if (sortBy.value === "completed") {
      return b.completed - a.completed
    } else {
      return a.completed - b.completed
    }
  })
})
</script>
