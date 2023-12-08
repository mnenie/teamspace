<script setup lang="ts">
import FiltersElement from './FiltersElement.vue';
import TitleProject from './TitleProject.vue'
</script>

<template>
  <div class="content"> 
    <TitleProject />
    <!-- <FiltersElement /> -->
  </div>
</template>

<style scoped>
.content{
  border-bottom: 1.3px solid var(--gray-color);
}
</style>