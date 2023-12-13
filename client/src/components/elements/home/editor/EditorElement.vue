<script setup lang="ts">
import Editor from 'primevue/editor';

const props = defineProps<{text : string}>
()

</script>

<template>
  <div>
    <Editor v-model="props.text" editorStyle="height: 80vh" />
  </div>
</template>


<style scoped></style>