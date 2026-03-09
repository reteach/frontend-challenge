export type Todo = { id: number; title: string; completed: boolean };

export function filteredTodos(
  localTodos: Todo[],
  sortOrder: 'pending' | 'completed',
  maxItems: string,
) {
  if (!localTodos.length) return [];
  const limit = maxItems === '' ? Infinity : Number(maxItems);
  return [...localTodos]
    .sort((a, b) => {
      if (sortOrder === 'pending') {
        return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
      } else {
        return a.completed === b.completed ? 0 : a.completed ? -1 : 1;
      }
    })
    .slice(0, limit);
}

export function getCheckAll(localTodos: Todo[]) {
  return localTodos.every((todo) => todo.completed);
}

export function setCheckAll(localTodos: Todo[], newValue: boolean): Todo[] {
  return localTodos.map((todo) => ({ ...todo, completed: newValue }));
}
