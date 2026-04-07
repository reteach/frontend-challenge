import { it, expect, describe } from "vitest";

import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";
import { UsersList } from "#components";
import type { User } from "~/types";

const makeMockUser = (name: string, username: string): User => ({
  id: Math.random(),
  name,
  email: `${name.toLowerCase()}@test.com`,
  username,
});

const mockUserList = [
  makeMockUser("Test", "cooltestuser123"),
  makeMockUser("Juan", "juaniscooler"),
];

mockNuxtImport("useRequestUserList", () => {
  return () => ({
    search: "",
    users: mockUserList,
  });
});

describe("UserList", () => {
  it("can render multiple users", async () => {
    const component = await mountSuspended(UsersList);

    expect(component.text()).toContain(mockUserList[0].name);
    expect(component.text()).toContain(mockUserList[0].email);
    expect(component.text()).toContain(mockUserList[0].username);
  });
});
