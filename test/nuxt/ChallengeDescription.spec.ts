import { it, expect } from 'vitest';

// tests/components/SomeComponents.nuxt.spec.ts
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { ChallengeDescription } from '#components';

it('can mount some component', async () => {
  const component = await mountSuspended(ChallengeDescription);
  expect(component.text()).toContain('Bonus');
});
