<script setup lang="ts">
import Navbar from './components/layout/Navbar.vue';
</script>

<template>
  <div>
    <div>
      <Navbar />
    </div>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped></style>