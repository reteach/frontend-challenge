<template>
  <AwesomeSection>
    <h2>Users List</h2>
    <input type="text" placeholder="Search..." v-model="search" />
    <ul>
      <UsersListItem v-for="user in users" v-bind="user" :key="user.id" />
    </ul>
  </AwesomeSection>
</template>

<script setup>
const { search, users } = await useRequestUserList();
</script>
