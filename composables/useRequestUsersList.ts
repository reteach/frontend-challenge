import { useAsyncData } from "nuxt/app";
import type { User } from "~/types";

export const useRequestUserList = async () => {
  const search = ref("");

  const { data: users } = await useAsyncData(
    "users",
    (_nuxtApp, { signal }) =>
      $fetch("https://jsonplaceholder.typicode.com/users", {
        signal,
      }) as Promise<User[]>,
  );

  const filteredUsers = computed(() => {
    if (!users.value) return [];
    return users.value.filter((user) =>
      user.name.toLowerCase().includes(search.value.toLowerCase()),
    );
  });

  return {
    search,
    users: filteredUsers,
  };
};
