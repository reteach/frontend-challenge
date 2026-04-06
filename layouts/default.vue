<template>
  <div class="app-layout">
    <AwesomeHeader />
    <div class="app-grid">
      <AwesomeNavbar />
      <main class="page-content">
        <slot />
      </main>
      <AwesomeSidebar />
    </div>
    <AwesomeFooter />
  </div>
</template>

<style scoped>
.app-layout {
  display: grid;
  container-type: inline-size;
  min-height: 100vh;
}

.app-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr min-content;
}

.page-content {
  display: grid;
  container-type: inline-size;
  vertical-align: top;
  background-color: #e2eafc;
}

@container (min-width: 400px) {
  .page-content {
    padding: 20px;
  }
}

@container (min-width: 900px) {
  .app-grid {
    grid-template-columns: minmax(20%, 200px) 1fr minmax(20%, 300px);
  }
}
</style>
