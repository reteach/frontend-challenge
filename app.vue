<template>
  <NuxtLayout>
    <NuxtPage />
    <ClientOnly>
      <VueAxePopup v-if="isDev" />
    </ClientOnly>
  </NuxtLayout>
</template>
<script setup>
import { VueAxePopup } from "vue-axe"
const isDev = process.dev
</script>
