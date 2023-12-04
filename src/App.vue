<script setup lang="ts">
import { ref } from 'vue';

  const value = ref<string>('abc')
</script>

<template>
  <div>
    {{value}}
  </div>
</template>

<style scoped>
</style>