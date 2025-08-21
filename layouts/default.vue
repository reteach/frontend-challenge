<template>
  <AwesomeHeader />
  <div class="wrapper">
    <AwesomeNavbar />
    <main>
      <slot />
    </main>
    <AwesomeSidebar />
  </div>
  <AwesomeFooter />
</template>
