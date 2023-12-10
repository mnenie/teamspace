<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import draggable from "vuedraggable";
import Item from './Item.vue'
import AddNewColumn from "../board/AddNewColumn.vue";
import { useBoard } from '@/store/board';

const { columns, getTasksByBoard } = useBoard()
onMounted(async () => {
  await getTasksByBoard(1)
})
const drag = ref(false)
const dragOptions = ref({
  animation: 250,
  group: "description",
  disabled: false,
  ghostClass: "ghost",
});
</script>

<template>
  <div class="dragg_items">
    <div class="dragg">
      <draggable tag="transition-group" :component-data="{
        tag: 'ul',
        type: 'transition-group',
        name: !drag ? 'flip-list' : null
      }" v-model="columns" v-bind="dragOptions" @start="drag = true" @end="drag = false" item-key="_id"
        class="draggable-list">
        <template #item="{ element }">
          <div style="display: flex; align-items: stretch; gap: 20px;">
            <Item :list="element" />
          </div>
        </template>
      </draggable>
      <div v-if="!drag" class="non-draggable-column">
        <AddNewColumn class="add" />
      </div>
    </div>
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

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.draggable-list {
  padding: 0;
  margin: 0;
  display: flex;
  gap: 20px;
}

.draggable-item {
  flex-shrink: 0;

}

.non-draggable-column {
  flex-shrink: 0;
  display: flex;
  transition: transform 0.5s;
}

.none-dragg {
  pointer-events: none;
  cursor: default;
}
</style>
