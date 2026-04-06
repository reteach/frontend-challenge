<template>
  <section>
    <slot />
  </section>
</template>

<style scoped>
  section {
    display: inline-block;
    vertical-align: top;
    background-color: #c1d3fe;
    padding: 15px;
  }

  @container (min-width: 400px) {
    section {
      padding: 15px;
      margin: 15px;
    }
  }
</style>
