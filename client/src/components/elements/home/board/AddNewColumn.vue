<template>
  <div class="column">
    <div @click="addNewColumn" class="custom-button">
      <p class="custom-text">+ New Column</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useManagerStore } from '@/store/manager';
const managerStore = useManagerStore();

const addNewColumn = () => {
  managerStore.boardForm = { visible: true, edit: true }
  managerStore.overlay = true
}
</script>

<style scoped>

.column{
  display: flex;
  align-items: center;
  min-height: 100%;
  padding-top: 11px;
}
.custom-button {
  height: 100%;
  display: flex;
  align-items: center;
  min-width: 280px;
  cursor: pointer;
  background: linear-gradient(to bottom, #E9EFFA, #E9EFFA 50%);
  border-radius: 0.375rem;
  color: #6B7280;
}

.custom-button:hover {
  background: linear-gradient(to bottom, #E9EFFA, #E9EFFA 25%);
  color: #8B5CF6;
}

.custom-text {
  font-size: 1.5rem;
  text-align: center;
  width: 100%;
  font-weight: bold;
  user-select: none;
}
</style>
