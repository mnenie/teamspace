<script lang="ts" setup>
import { inject, ref } from "vue";
import draggable from "vuedraggable";
import type { IColumn } from "../../../../../../models/Column";
import type { ITask } from '../../../../../../models/Task';
import { EllipsisHorizontalIcon } from '@heroicons/vue/24/outline';
import Card from './Card.vue'
import ButtonCard from "@/components/UI/ButtonCard.vue";

const props = defineProps<{
  list: IColumn;
}>();

const data = ref<ITask[]>([
  { id: 1, state: 'active', name: 'card', creatorId: 1, memberId: 1, columnId: 1, startDate: new Date("2021-10-02"), endDate: new Date("2021-11-03"), importance: 1 },
  { id: 2, state: 'active', name: 'card1', creatorId: 1, memberId: 1, columnId: 2, startDate: new Date("2021-10-02"), endDate: new Date("2021-11-03"), importance: 1 },
  { id: 3, state: 'active', name: 'card2', creatorId: 1, memberId: 1, columnId: 3 , startDate: new Date("2021-10-02"), endDate: new Date("2021-11-03"), importance: 1 },
]);

const bulletColors = (index: number): string => {
  const color = ["#49C4E5", "#8471F2", "#67E2AE"];
  if (color[index]) {
    return color[index];
  } else {
    let rand = Math.random();
    rand = Math.floor(rand * 360);
    rand = rand + 1;
    const randomColor = `hsl(${rand}, 80%, 70%)`;
    return randomColor;
  }
};


</script>

<template>
  <div class="list">
    <div class="list-header">
      <div style="display: flex; align-items: center; gap: 8px;" class="title">
        <div class="bullet" :style="{ backgroundColor: bulletColors(list.id) }"></div>
        <h3>{{ list.name }}</h3>
      </div>
      <EllipsisHorizontalIcon style="width: 20px; height: 20px; color: var(--text-color); cursor: pointer;" />
      <!-- <EyeIcon /> -->
    </div>
    <draggable :list="data" item-key="_id" group="list" :scroll-sensitivity="500" :force-fallback="true"
      class="list-body" ghost-class="ghost-card" drag-class="dragging-card">
      <template #item="{ element }">
        <div>
          <Card :card="element" />
        </div>
      </template>
    </draggable>

    <div class="list-footer">
      <ButtonCard>Добавить задачу</ButtonCard>
    </div>
  </div>
</template>

<style scoped>
.list {
  width: 18rem;
  flex: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem;
  background-color: var(--white-color);
  height: 100%;
  position: relative;
}

.list-header {
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
  background-color: #f9f9f9;
  cursor: grab;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-header h3 {
  font-weight: 500;
  color: var(--text-color);
}

.bullet {
  width: 4px;
  height: 4px;
  border-radius: 50%;
}

.list-body {
  padding: 0.5rem;
  gap: 0.5rem;
  flex: 1;
  overflow-y: auto;
}

.ghost-card {
  background-color: #f3f4f6;
  border-radius: 0.375rem;
}

.ghost-card>div {
  visibility: hidden;
}

.dragging-card {
  transform: rotate(2deg);
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.1);
  cursor: grabbing;
}

.sortable-chosen {
  opacity: 1 !important;
  cursor: grabbing;
}

.list-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.25rem;
  border-top: 1px solid #ddd;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
