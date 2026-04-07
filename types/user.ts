export type User = {
  id: number;
  name: string;
  email: string;
  username: string;
};

export type UserTodo = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};
