import { it, expect } from "vitest";

import { mountSuspended } from "@nuxt/test-utils/runtime";
import { UserTodoListItem } from "#components";
import type { UserTodo } from "~/types";

const makeTodoItem = (title: string, completed: boolean): UserTodo => ({
  id: Math.random(),
  userId: Math.random(),
  title,
  completed,
});

const mockTodoItem = makeTodoItem("Test Title", true);

it("render data about the item", async () => {
  const component = await mountSuspended(UserTodoListItem, {
    props: mockTodoItem,
  });

  expect(component.text()).toContain(mockTodoItem.title);
});

it("emit change on the checkbox to parent", async () => {
  const component = await mountSuspended(UserTodoListItem, {
    props: {
      title: mockTodoItem.title,
      modelValue: mockTodoItem.completed,
    },
  });

  const element = component.get("input");

  await element.setValue(false);

  const emittedChange = (
    component.emitted("update:modelValue") as Array<Array<number | boolean>>
  )[0];

  expect(emittedChange[0]).toBeFalsy();
});
