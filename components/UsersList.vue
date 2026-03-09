<template>
  <AwesomeSection aria-labelledby="users-list-heading">
    <h2 id="users-list-heading">Users List</h2>
    <input
      id="user-search"
      type="text"
      placeholder="Search..."
      v-model="search"
      aria-label="Search users"
    />
    <p v-if="error" role="alert">Failed to load users.</p>
    <p v-else-if="!users" aria-live="polite">Loading...</p>
    <ul v-else>
      <li v-for="user in filteredUsers" :key="user.id">
        <NuxtLink :to="`/user/${user.id}`">
          <p>Name: {{ user.name }}</p>
          <p>Email: {{ user.email }}</p>
          <p>Username: {{ user.username }}</p>
          <hr />
        </NuxtLink>
      </li>
    </ul>
  </AwesomeSection>
</template>

<script setup>
const search = ref("");
const { data: users, error } = useAsyncData("users", () =>
  $fetch("https://jsonplaceholder.typicode.com/users"),
);
const filteredUsers = computed(() => {
  if (!users.value) return [];
  const query = search.value.toLowerCase();
  return users.value.filter((user) => user.name.toLowerCase().includes(query));
});
</script>
