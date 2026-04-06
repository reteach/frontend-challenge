<template>
  <nav>
    Navigation
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/">Home 2</a></li>
      <li><a href="/">Home 3</a></li>
      <li><a href="/">Home 4</a></li>
      <NuxtLink to="/gallery">Gallery</NuxtLink>
    </ul>
  </nav>
</template>

<style scoped>
  nav {
    display: inline-block;
    vertical-align: top;
    background-color: #dbfbdb;
    padding: 10px;
  }
</style>
