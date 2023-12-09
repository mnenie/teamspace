<script setup lang="ts">
import Editor from 'primevue/editor';
import { ref } from "vue";

const value = ref<string>('dsjfdsnfdsjnfbdsnb');
</script>

<template>
  <div>
    <Editor v-model="value" editorStyle="height: 100vh" />
  </div>
</template>


<style scoped></style>