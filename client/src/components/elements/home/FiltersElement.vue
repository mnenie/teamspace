<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue';
import type { IFilters } from '@/types/filters.interface';
import { HOME_ROUTE, NOTFOUND_ROUTE, SHOP_ROUTE } from '../../../utils/consts';
import { useRouter } from 'vue-router';
import { BOARD_ROUTE } from '../../../utils/consts';
import { useBoard } from '@/store/board';
import { useProject } from '@/store/project';

const filters = ref<IFilters[]>([
  { id: 0, active: true, title: 'Доска' },
  { id: 1, active: false, title: 'Участники' },
  { id: 2, active: false, title: 'Магазин' },
]);

const board = useBoard();
const router = useRouter();

const getFilterRoute = (id: number): string => {
  if (id === 0) {
    return board.boards[0]?.id ? BOARD_ROUTE + '/' + board.boards[0].id : HOME_ROUTE
  }
  if (id === 1) {
    return HOME_ROUTE
  }
  if (id === 2) {
    return SHOP_ROUTE
  }
  return NOTFOUND_ROUTE
};

const isFilterActive = (id: number): boolean => {
  const currentRoute = router.currentRoute.value.path;
  if (id === 0) {
    return currentRoute.startsWith(BOARD_ROUTE)
  } 
  if (id === 1) {
    return currentRoute === HOME_ROUTE;
  } 
  if (id === 2) {
    return currentRoute === SHOP_ROUTE;
  } 
  else {
    return false;
  }
};
</script>

<template>
  <div class="filters">
    <div v-for="(filter) in filters" :key="filter.id" class="filter_item">
      <router-link class="filter_route" :to="getFilterRoute(filter.id)"
        :class="{ active_filter: isFilterActive(filter.id) }">
        {{ filter.title }}
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  align-items: center;
  gap: 15px;
}

.filter_item>span {
  color: var(--text-color);
  cursor: pointer;
}

.active_filter {
  padding-bottom: 2px;
  border-bottom: 2px solid var(--green-btn-color);
}

.filter_route {
  text-decoration: none;
  color: var(--text-color);
}
</style>
