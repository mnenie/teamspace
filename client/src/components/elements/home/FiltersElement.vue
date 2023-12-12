<script setup lang="ts">
// import { onMounted, ref, watch } from 'vue';
// import type { IFilters } from '@/types/filters.interface';
// import { HOME_ROUTE, EDITOR_ROUTE, SETTINGS_ROUTE } from '../../../utils/consts';
// import { useRouter } from 'vue-router';
// import { BOARD_ROUTE } from '../../../utils/consts';
// import { useBoard } from '@/store/board';
// import { useProject } from '@/store/project';
// const filters = ref<IFilters[]>([
//   { id: 0, active: true, title: 'Доска' },
//   { id: 1, active: false, title: 'Идея' },
//   { id: 2, active: false, title: 'Настройки' },
// ])

// const board = useBoard();
// const project = useProject();
// const router = useRouter()

// watch(() => project.project, () => {
//   filterChanges((0));

// }, { deep: true })

// onMounted(async() => {
//   if (project.project) {
//     router.push(BOARD_ROUTE + '/' + board.boards[0].id);
//   } else {
//     router.push(HOME_ROUTE);
//   }
// });

// const filterChanges = (id: number) => {
//   filters.value.forEach((btn, i) => {
//     btn.active = i === id;
//   });
//   if (id === 0 && board.boards[0]) {
//     if (board.boards.length > 0) {
//       router.push(BOARD_ROUTE + '/' + board.boards[0].id);
//     }
//   }
//   if (id === 1) {
//     router.push(EDITOR_ROUTE)
//   }
//   if (id === 2) {
//     router.push(SETTINGS_ROUTE)
//   }

// } 
</script>

<template>
  <div class="filters">
    <div v-for="filter in filters" :key="filter.id" class="filter_item">
      <span @click="filterChanges(filter.id)" :class="[filter.active ? 'active' : '']">{{ filter.title }}</span>
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

.active {
  padding-bottom: 2px;
  border-bottom: 2px solid var(--green-btn-color);
}
</style>