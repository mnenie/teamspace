<script setup lang="ts">
import { Draggable } from 'vue3-smooth-dnd'
interface IItem{
  name: string;
  id: number
}
defineProps<{
  item: IItem
}>()
</script>

<template>
  <Draggable v-if="item" class="item">
    <div class="item-content">
      <div class="p-4 space-y-2">
        <p>{{ item.name }}</p>
      </div>
    </div>
  </Draggable>
</template>

<style lang="css" scoped>
.item {
  cursor: move;
  margin-top: 2px;
  margin-bottom: 4px;
}

.item-content {
  cursor: move;
  margin-top: 2px;
  margin-bottom: 4px;
  margin-left: 4px;
  margin-right: 4px;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f3f4f6;
  transition: border-width 0.2s ease-in-out;
  border: 1px solid #3490dc;
}


.p-4 {
  padding: 1rem;
}

.space-y-2 {
  margin-bottom: 0.5rem;
}

.bg-primary {
  background-color: #3490dc;
}

.text-white {
  color: #ffffff;
}
</style>
