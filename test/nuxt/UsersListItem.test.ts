import { it, expect } from "vitest";

import { mountSuspended } from "@nuxt/test-utils/runtime";
import { UsersListItem } from "#components";
import type { User } from "~/types";

const mockUser: User = {
  id: 1,
  name: "Tester",
  email: "tester@test.com",
  username: "cooltestuser123",
};

it("can mount component", async () => {
  const component = await mountSuspended(UsersListItem, {
    props: mockUser,
  });
  expect(component.text()).toContain(mockUser.name);
  expect(component.text()).toContain(mockUser.email);
  expect(component.text()).toContain(mockUser.username);
});
