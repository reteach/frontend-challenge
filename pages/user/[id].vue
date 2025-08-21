<template>
  <AwesomeArticle>
    <h1>User Todo's</h1>
    <div>
      Filters:
      <span>
        <label for="completed">Show completed</label>
        <input type="checkbox" id="completed" />
      </span>
      <span>
        <label for="pending">Show pending</label>
        <input type="checkbox" id="pending" />
      </span>
    </div>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <h4>{{ todo.title }}</h4>
        <p>Status: {{ todo.completed ? 'Completed' : 'Pending' }}</p>
      </li>
    </ul>
  </AwesomeArticle>
</template>

<script setup>
const route = useRoute();

const { data: todos } = useAsyncData(() =>
  fetch(
    `https://jsonplaceholder.typicode.com/users/${route.params.id}/todos`
  ).then((res) => res.json())
);
</script>
