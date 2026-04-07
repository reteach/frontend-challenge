import { it, expect } from "vitest";

import { mountSuspended } from "@nuxt/test-utils/runtime";
import { UserTodoList } from "#components";
import type { UserTodo } from "~/types";

const makeTodoItem = (title: string, completed: boolean): UserTodo => ({
  id: Math.random(),
  userId: Math.random(),
  title,
  completed,
});

const mockTodoList = [
  makeTodoItem("My First Item", true),
  makeTodoItem("Unfineshed Business", false),
];

it("render multiple todo items", async () => {
  const component = await mountSuspended(UserTodoList, {
    props: {
      todos: mockTodoList,
    },
  });
  expect(component.text()).toContain(mockTodoList[0].title);
  expect(component.text()).toContain(mockTodoList[1].title);
});

it("emit changes from specific checkbox interactions to parent", async () => {
  const component = await mountSuspended(UserTodoList, {
    props: {
      todos: mockTodoList,
    },
  });
  const element = component.findAll("input").at(1);

  await element?.setValue(true);

  const emittedChange = (
    component.emitted("updateTodoStatus") as Array<Array<number | boolean>>
  )[0];

  expect(emittedChange[0]).toBe(mockTodoList[1].id);
  expect(emittedChange[1]).toBeTruthy();
});
