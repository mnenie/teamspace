<script setup lang="ts">
import Editor from 'primevue/editor';
import { ref } from "vue";

const value = ref<string>('');
</script>

<template>
  <div>
    <Editor v-model="value" editorStyle="height: 320px" />
  </div>
</template>


<style scoped></style>