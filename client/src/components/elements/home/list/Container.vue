<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import draggable from "vuedraggable";
import Item from './Item.vue'
import AddNewColumn from "../board/AddNewColumn.vue";
import { useBoard } from '@/store/board';

// const lists = ref<IColumn[]>([
//   { id: 1, boardId: 1, name: 'To Do', place: 1 },
//   { id: 2, boardId: 1, name: 'To Do 1', place: 2 },
//   { id: 3, boardId: 1, name: 'To Do 2', place: 3 },
//   { id: 4, boardId: 1, name: 'To Do 2', place: 3 },
//   { id: 5, boardId: 1, name: 'To Do 2', place: 3 },
//   { id: 6, boardId: 1, name: 'To Do 2', place: 3 },
//   { id: 7, boardId: 1, name: 'To Do 2', place: 3 },
//   { id: 8, boardId: 1, name: 'To Do 2', place: 3 },
//   { id: 9, boardId: 1, name: 'To Do 2', place: 3 },
// ])
const {columns, getTasksByBoard} = useBoard()
onMounted(async ()=>{
  await getTasksByBoard(1)
})
</script>

<template>
  <div class="dragg_items">
    <draggable :list="columns" ghost-class="ghost-board" drag-class="dragging-board" item-key="_id"
      :scroll-sensitivity="500" :force-fallback="true" class="dragg">
      <template #item="{ element, index }">
        <div style="display: flex; align-items: stretch; gap: 20px;">
          <Item :list="element" />
          <template v-if="index === columns.length - 1">
            <AddNewColumn class="add" />
          </template>
        </div>
      </template>
    </draggable>
  </div>
</template>

<style scoped>
.dragg_items {
  position: relative;
}

.dragg {
  width: 100%;
  overflow-x: auto;
  display: flex;
  position: absolute;
  gap: 20px;
  padding: 20px 10px;
  height: 86vh;
}

.ghost-board>div {
  opacity: 0.5;
}

.ghost-board>div>div {
  visibility: hidden;
}

.dragging-board {
  /* box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);s */
  transform: rotate(2deg);
  cursor: grabbing;
}

.list .sortable-chosen {
  overflow: hidden;
  opacity: 1 !important;
}
</style>
