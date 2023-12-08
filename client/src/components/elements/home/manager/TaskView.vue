<script setup lang="ts">
import { computed } from 'vue';
import { useBoardsStore } from '@/store/boards';
import { useManagerStore } from '@/store/manager';
import Subtask from '../manager/taskView/Subtask.vue'
import Dropdown from './Dropdown.vue';
import BaseSelect from '../form/BaseSelect.vue';

const boardsStore = useBoardsStore();
const managerStore = useManagerStore();
const subtasksCompleted = computed(() => {
  const completed = boardsStore.getTask?.subtasks.filter((sub) => sub.isCompleted).length;
  const total = boardsStore.getTask?.subtasks.length;
  return `${completed} of ${total}`;
});
const changeColumn = ({ index }) => {
  boardsStore.changeTaskColumn(index);
};
const editTask = () => {
  managerStore.taskForm = { edit: true, visible: true };
  managerStore.taskView = false;
};
const deleteTask = () => {
  managerStore.delete = { board: false, visible: true };
  managerStore.taskView = false;
};
</script>

<template>
  <div class="container_subtask">
    <div class="content_subtask">
      <div class="header">
        <h4 class="title">{{ boardsStore.getTask?.title }}</h4>
        <Dropdown @onClickEdit="editTask" @onClickDelete="deleteTask" target="Task" />
      </div>
      <p v-if="boardsStore.getTask?.description" class="description">{{ boardsStore.getTask.description }}</p>
      <div class="subtasks">
        <p class="font-bold">Subtasks ({{ subtasksCompleted }})</p>
        <div class="subtask-container">
          <Subtask v-for="(subtask, index) in boardsStore?.getTask?.subtasks" :key="index" :subtask="subtask" />
        </div>
      </div>
      <div class="status">
        <p class="font-bold">Current Status</p>
        <BaseSelect @onClickOption="changeColumn" :value="boardsStore.getCurrentColumn.name" />
      </div>
    </div>
  </div>
</template>


<style scoped lang="css">
.container_subtask {
  background-color: #fff;
  border-radius: 1rem;
  padding: 0.25rem;
}

.content_subtask {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-height: 90vh;
  overflow-y: auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.title {
  color: #000;
  font-weight: bold;
  font-size: 1.125rem;
}

.dark-title {
  color: #fff;
}

.description {
  color: #757575;
  font-size: 0.875rem;
}

.subtasks {
  color: #757575;
  font-size: 0.75rem;
  font-weight: bold;
  padding-bottom: 0.5rem;
}

.subtask-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.status {
  color: #757575;
  font-size: 0.75rem;
  font-weight: bold;
  padding-bottom: 0.5rem;
}
</style>
