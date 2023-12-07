<script setup lang="ts">
import { ref } from 'vue';
import { Container, Draggable } from 'vue3-smooth-dnd';
import { applyDrag } from '@/helpers/helperKanban.ts';
import KanbanItem from './KanbanItem.vue';
interface DropResult {
  removedIndex: number | null;
  addedIndex: number | null;
  payload: {
    loading: boolean;
  };
}
const words = [
  { id: 1, name: 'test1' },
  { id: 2, name: 'test2' },
  { id: 3, name: 'test3' },
  { id: 4, name: 'test4' },
  { id: 5, name: 'test5' },
  { id: 6, name: 'test6' },
]
const scene = ref({
  type: 'container',
  props: {
    orientation: 'horizontal'
  },
  children: words.map((word, i) => ({
    id: `column${i}`,
    type: 'container',
    name: word.name,
    props: {
      orientation: 'vertical',
    },
    children: words.map((item, j) => ({
      type: 'draggable',
      id: `${i}${j}`,
      loading: false,
      data: item,
    })),
  })),
});

// const getColumnHeightPx = () => {
//   let kanban = document.getElementById('kanbanContainer');
//   return kanban ? kanban.offsetHeight - 122 : 0;
// };

const onColumnDrop = (dropResult: DropResult) => {
  scene.value = Object.assign({}, scene.value);
  scene.value.children = applyDrag(scene.value.children, dropResult);
};

const onCardDrop = (columnId: number, dropResult: DropResult) => {
  if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
    const column = scene.value.children.filter(p => p.id === columnId)[0];
    const itemIndex = scene.value.children.indexOf(column);
    const newColumn = Object.assign({}, column);

    if (dropResult.removedIndex == null && dropResult.addedIndex && dropResult.addedIndex >= 0) {
      dropResult.payload.loading = false
    }

    newColumn.children = applyDrag(newColumn.children, dropResult);
    scene.value.children.splice(itemIndex, 1, newColumn);
  }
};

const getCardPayload = (columnId: number) => {
  return (index: number) => {
    return scene.value.children.filter(p => p.id === columnId)[0].children[index];
  };
};

const shouldAcceptDrop = (e: { groupName: string }, payload: { loading: boolean }) => {
  return e.groupName === 'col-items' && !payload.loading;
};
</script>
<template>
  <Container group-name="cols" tag="div" orientation="horizontal" @drop="onColumnDrop($event)">
    <Draggable class="kanban-column" v-for="column in scene.children" :key="column.id">
      <div class="kanban-column-inner">
        <div class="kanban-header">
          <span class="text-lg">{{ column.name }}</span>
        </div>
        <Container class="kanban-column-content" group-name="col-items" :shouldAcceptDrop="shouldAcceptDrop"
          :get-child-payload="getCardPayload(column.id)" :drop-placeholder="{
            animationDuration: '200',
            showOnTop: true
          }" drag-class="kanban-draggable" drop-class="kanban-drop" @drop="(e: any) => onCardDrop(column.id, e)">
          <KanbanItem v-for="item in words" :key="item.id" :item="item"></KanbanItem>
        </Container>
      </div>
    </Draggable>
  </Container>
</template>

<style scoped>
.kanban-column {
  background-color: #f0f0f0;
  border-radius: 8px;
  width: 96px;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.kanban-column-inner {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.kanban-header {
  cursor: move;
  border-radius: 8px 8px 0 0;
  padding: 16px;
  background-color: #3490dc;
  color: #ffffff;
}

.kanban-column-content {
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.kanban-draggable {
  background-color: #3490dc;
  border: 2px solid #1e4a7e;
  color: #ffffff;
  transition: background-color 0.2s ease-in-out;
  transform: rotate(6deg) scale(1.1);
}

.kanban-drop {
  transition: transform 0.2s ease-in-out;
  transform: rotate(-2deg) scale(0.9);
}
</style>