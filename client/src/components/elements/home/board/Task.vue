<script setup lang="ts">

const props = defineProps<{
  task: any
}>()
</script>

<template>
  <article class="custom-task">
    <h3 class="custom-title">{{ task.title }}</h3>
  </article>
</template>


<style scoped>
.custom-task {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  color: #000;
  border-radius: 0.375rem;
  padding: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 280px;
}

.custom-task:hover {
  color: #8B5CF6;
}

.custom-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
</style>
