<script setup lang="ts">
import { computed } from 'vue';
import { useBoardsStore } from '@/store/boards';
import { useManagerStore } from '@/store/manager';
import ButtonCard from '@/components/UI/ButtonCard.vue';

const boardsStore = useBoardsStore();
const managerStore = useManagerStore();

const warning = computed(() => {
  if (managerStore.delete.board) {
    return `Are you sure you want to delete the ‘${boardsStore.getCurrentBoard.name}’ board? This action will remove all columns and tasks and cannot be reversed.`;
  } else {
    return `Are you sure you want to delete the ‘${boardsStore.getTask.title}’ task and its subtasks? This action cannot be reversed.`;
  }
});

const onDelete = () => {
  if (managerStore.delete.board) {
    boardsStore.boards.splice(boardsStore.selectedBoard, 1);
    managerStore.hideOverlay();
  } else {
    boardsStore.getCurrentColumn.tasks.splice(boardsStore.selectedTask, 1);
    managerStore.hideOverlay();
  }
};

const onCancel = () => {
  managerStore.hideOverlay();
};
</script>

<template>
  <div class="delete-confirmation-container">
    <div class="confirmation-box">
      <div class="header">
        <h4 class="delete-title">Delete this {{ managerStore.delete.board ? 'board' : 'task' }}</h4>
      </div>
      <p class="warning-text">{{ warning }}</p>
      <div class="button-container">
        <ButtonCard @click.stop="onDelete">Delete</ButtonCard>
        <ButtonCard @click.stop="onCancel">Cancel</ButtonCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.delete-confirmation-container {
  background-color: #fff;
  background-color: #333;
  border-radius: 0.5rem;

}

.confirmation-box {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete-title {
  color: #e53e3e;
  font-weight: bold;
  font-size: 1.125rem;
}

.warning-text {
  color: #757575;
  font-size: 0.875rem;
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
