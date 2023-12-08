<script setup lang="ts">
import { ref, reactive, onBeforeUpdate } from 'vue'
import { useBoardsStore } from '@/store/boards';
import { useManagerStore } from '@/store/manager';
import BaseInput from '../form/BaseInput.vue';
import ButtonCard from '@/components/UI/ButtonCard.vue';

const boardsStore = useBoardsStore();
const managerStore = useManagerStore();

const inputTitle = ref<{ value: HTMLElement | null; error: boolean }>({ value: null, error: false });
const inputs = ref([]);

interface BoardColumn {
  name: string;
  tasks: any[];
}

interface Board {
  name: string;
  columns: BoardColumn[];
}

const board: Board = reactive({
  name: '',
  columns: []
});

const columnsPlaceholders = ref({
  0: '...',
  1: '...',
  2: '...'
});

const deleteColumn = (index: number) => {
  if (board.columns.length === 2) {
    board.columns[index].name = '';
    board.columns[index].tasks = [{ name: '', tasks: [] }];
  } else {
    board.columns.splice(index, 1);
  }
};

const addColumn = () => {
  board.columns.push({ name: '', tasks: [] });
};

const onSubmit = () => {
  if (validate()) {
    if (managerStore.boardForm.edit) {
      boardsStore.boards[boardsStore.selectedBoard] = board;
    } else {
      boardsStore.boards.push(board);
      boardsStore.selectedBoard = boardsStore.boards.length - 1;
    }
    managerStore.hideOverlay();
  }
};

const validate = () => {
  let valid = true;
  if (board.name.trim().length === 0) {
    valid = false;
    inputTitle.value.error = true;
  }
  inputs.value.forEach((e: { value: HTMLElement | null; error: boolean }, index) => {
    if (board?.columns[index]?.name.trim().length === 0) {
      valid = false;
      e.error = true;
    }
  });
  return valid;
};

if (managerStore.boardForm.edit) {
  board.name = JSON.parse(JSON.stringify(boardsStore.boards[boardsStore.selectedBoard].name));
  board.columns = JSON.parse(JSON.stringify(boardsStore.getCurrentBoard.columns));
} else {
  board.columns = [{ name: '', tasks: [] }, { name: '', tasks: [] }];
}

onBeforeUpdate(() => {
  inputs.value = [];
});
</script>

<template>
  <form @submit.prevent="onSubmit" class="form-container">
    <div class="form-content">
      <div class="form-header">
        <h4 class="form-title">
          {{ managerStore.boardForm.edit ? 'Edit Board' : 'Add New Board' }}
        </h4>
      </div>
      <BaseInput ref="inputTitle" v-model="board.name" inputName="Board Name" placeholder="e.g. Web Design" />
      <div class="form-columns">
        <p class="form-columns-label">Board Columns</p>
        <div class="form-column-item" v-for="(column, index) in board.columns" :key="index">
          <BaseInput v-model="column.name" :placeholder="columnsPlaceholders[index] ? columnsPlaceholders[index] : 'Your Column title...'" />
          <ButtonCard @click="deleteColumn(index)" class="delete-column-button">Delete</ButtonCard>
        </div>
        <ButtonCard @click.stop="addColumn" class="add-column-button">+ Add New Column</ButtonCard>
      </div>
      <ButtonCard type="submit">
        {{ managerStore.boardForm.edit ? 'Save Changes' : 'Create New Board' }}
      </ButtonCard>
    </div>
  </form>
</template>

<style scoped>
.form-container {
  background-color: #fff;
  border-radius: 0.5rem;
}

.form-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-title {
  color: #000;
  dark:text-white;
  font-weight: bold;
  font-size: 1.125rem;
}

.form-columns {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-columns-label {
  color: #757575;
  dark:text-white;
  font-size: 0.875rem;
}

.form-column-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.delete-column-button {
  cursor: pointer;
}

.add-column-button {
  cursor: pointer;
}
</style>
