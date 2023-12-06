<script setup lang="ts">
import { ref } from 'vue';
import type { IFilters } from '@/types/filters.interface';

const filters = ref<IFilters[]>([
  {id: 1, active: true, title: 'Доска'},
  {id: 2, active: false, title: 'Обзор'},
  {id: 3, active: false, title: 'Настройки'},
])
</script>

<template>
  <div class="filters">
    <div v-for="filter in filters" :key="filter.id" class="filter_item">
      <span :class="[filter.active ? 'active' : '']">{{ filter.title }}</span>
    </div>
  </div>
</template>

<style scoped>
.filters{
  display: flex;
  align-items: center;
  gap: 10px;
}
.filter_item > span{
  color: var(--text-color);
  cursor: pointer;
}
.active{
  padding-bottom: 2px;
  border-bottom: 2px solid var(--green-color);
}
</style>