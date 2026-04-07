<template>
  <li>
    <NuxtLink :to="`/user/${id}`">
      <p>Name: {{ name }}</p>
      <p>Email: {{ email }}</p>
      <p>Username: {{ username }}</p>
      <hr />
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
import type { User } from "~/types";

const props = defineProps<User>();
</script>
