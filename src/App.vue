<script setup lang="ts">
import NavbarElement from './components/layout/NavbarElement.vue';
</script>

<template>
  <div>
    <div>
      <NavbarElement />
    </div>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped></style>