<script setup lang="ts">
  // import test from './navbar/test.vue'
  import Sidebar from 'primevue/sidebar';
  import type Button from 'primevue/button';
  import { ref } from 'vue';

  const visible = ref<boolean>(true)
</script>

<template>
  <div class="card flex justify-content-center">
    <Sidebar v-model:visible="visible" header="Sidebar">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </Sidebar>
    <Button icon="pi pi-arrow-right" @click="visible = !visible" />
  </div>
</template>

<style scoped>
</style>