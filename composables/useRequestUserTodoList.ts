import type { UserTodo } from "~/types";

export const useRequestUserTodoList = async () => {
  const route = useRoute();

  const { data: todos } = await useAsyncData(
    "user-todos",
    (_nuxtApp, { signal }) =>
      $fetch(
        `https://jsonplaceholder.typicode.com/users/${route.params.id}/todos`,
        { signal },
      ) as Promise<UserTodo[]>,
  );

  return {
    todos,
  };
};
