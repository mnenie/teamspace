<script setup lang="ts">
import Task from "./Task.vue";
import { useBoardsStore } from "@/store/boards";
import { useManagerStore } from "@/store/manager";

const managerStore = useManagerStore();
const boardsStore = useBoardsStore();

const onClickTask = (columnIndex: number, taskIndex: number) => {
  boardsStore.selectedColumn = columnIndex;
  boardsStore.selectedTask = taskIndex;
  managerStore.taskView = true;
  managerStore.overlay = true;
};

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
  <div class="boards-container">
    <section
      v-for="(column, columnIndex) in boardsStore.getColumns"
      :key="columnIndex"
      class="column-container"
      data-dragscroll
    >
      <div class="column-header">
        <div class="bullet" :style="{ backgroundColor: bulletColors(columnIndex) }"></div>
        <h2 class="column-title">{{ column.name }} ({{ column.tasks.length }})</h2>
      </div>
      <TransitionGroup name="tasks" tag="div" data-dragscroll class="task-container">
        <Task
          v-for="(task, taskIndex) in column?.tasks"
          :key="taskIndex"
          :task="task"
          @click="onClickTask(columnIndex, taskIndex)"
        />
      </TransitionGroup>
    </section>
  </div>
</template>


<style scoped>
.boards-container {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 20px;
}

.column-container {
  min-width: 280px;
  box-sizing: content-box;
  padding-right: 1.5rem;
}

.column-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 1.5rem;
}

.bullet {
  width: 4px;
  height: 4px;
  border-radius: 50%;
}

.column-title {
  font-size: 0.875rem;
  font-weight: bold;
  text-transform: uppercase;
}

.task-container {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.tasks-enter-from {
  opacity: 0;
  transform: scale(0.75);
}

.tasks-enter-to {
  opacity: 1;
  transform: scale(1);
}

.tasks-enter-active {
  transition: all 0.5s ease;
}
</style>
