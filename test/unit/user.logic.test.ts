import { describe, test, expect } from 'vitest';
import {
  filteredTodos,
  getCheckAll,
  setCheckAll,
  type Todo,
} from '../../utils/todo';

describe('filteredTodos', () => {
  const todos: Todo[] = [
    { id: 1, title: 'A', completed: false },
    { id: 2, title: 'B', completed: true },
    { id: 3, title: 'C', completed: false },
    { id: 4, title: 'D', completed: true },
    { id: 5, title: 'E', completed: false },
  ];

  test('"pending" sort puts all pending todos before completed ones', () => {
    const result = filteredTodos(todos, 'pending', '');
    expect(result.map((t) => t.completed)).toEqual([
      false,
      false,
      false,
      true,
      true,
    ]);
  });

  test('empty string limit returns all items', () => {
    expect(filteredTodos(todos, 'pending', '')).toHaveLength(todos.length);
  });
});

describe('checkAll getter', () => {
  test('returns true when every todo is completed', () => {
    const todos: Todo[] = [
      { id: 1, title: 'A', completed: true },
      { id: 2, title: 'B', completed: true },
    ];
    expect(getCheckAll(todos)).toBe(true);
  });

  test('returns false when at least one todo is pending', () => {
    const todos: Todo[] = [
      { id: 1, title: 'A', completed: true },
      { id: 2, title: 'B', completed: false },
    ];
    expect(getCheckAll(todos)).toBe(false);
  });
});

describe('checkAll setter', () => {
  test('setting false marks every todo as pending', () => {
    const todos: Todo[] = [
      { id: 1, title: 'A', completed: true },
      { id: 2, title: 'B', completed: true },
    ];
    const result = setCheckAll(todos, false);
    expect(getCheckAll(result)).toBe(false);
  });
});
