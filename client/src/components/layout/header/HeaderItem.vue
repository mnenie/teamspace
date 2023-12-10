<script setup lang="ts">
import { UserCircleIcon } from '@heroicons/vue/24/outline'
import { useProject } from '../../../store/project';

</script>

<template>
  <div class="header_items">
    <div class="icon">
      <span>TeamSpace</span>
      <button @click="open">Создать проект</button>
    </div>
    <div class="right">
      <div class="user_info">
        <UserCircleIcon style="width: 20px; height: 20px;" />
        <span style="color: var(--text-color);">Никола Жухлый</span>
      </div>
      <!-- <span style="color: var(--text-color);">Выйти</span> -->
    </div>
  </div>
</template>

<style scoped>
.header_items {
  padding: 15px 10px;
  border-bottom: 1.3px solid var(--gray-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.icon {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon>span {
  color: var(--text-color);
  font-size: 30px;
}

.icon>img {
  width: 20px;
  height: 20px;
}
.right{
  display: flex;
  align-items: center;
  gap: 15px;
}
.user_info {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}
</style>