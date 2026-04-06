<template>
  <AwesomeSection class="resume-section">
    <details>
      <summary title="Click to view the challenge description">
        <strong>
          <a href="https://github.com/reteach/frontend-challenge/tree/main"
            >README</a
          >
        </strong>
      </summary>
      <ChallengeDescription />
    </details>

    <img
    src="/img.png"
    srcset="
      /img.png 100w,
      /img.png 300w,
      /img.png 600w,
      /img.png 1000w,
      /img.png 1300w
    "
    sizes="
      (max-width: 100px) 100px,
      (max-width: 300px) 300px,
      (max-width: 700px) 600px,
      80vmin
    "
    alt="User avatar"
    />
  </AwesomeSection>
  <UsersList class="user-list-section" />
</template>
