<template>
  <AwesomeHeader />
  <div class="wrapper">
    <AwesomeNavbar />
    <main>
      <slot />
      <AwesomeSidebar />
    </main>
  </div>
  <AwesomeFooter />
</template>
