import { describe, it, expect } from "vitest";
import { $fetch, setup } from "@nuxt/test-utils/e2e";

describe.skip("login page", async () => {
  await setup({});

  it("displays at least one image", async () => {
    const html = await $fetch("/gallery");
    expect(html).toContain("<img");
  });
});
