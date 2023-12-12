<script lang="ts" setup>
import type { ITask } from '@/types/Task';
interface Props {
  card: ITask;
}
const props = defineProps<Props>();
</script>
<template>
  <div class="element">
    <div class="title">
      <span style="color: var(--text-color);" class="title_span">{{ card.name }}</span>
      <div style="display: flex; align-items: center; gap: 10px;" class="items">
        <!-- <Cog6ToothIcon style="width: 12px; height: 12px; cursor: pointer; color: var(--text-color);" />
        <TrashIcon style="width: 12px; height: 12px; cursor: pointer; color: var(--text-color);" /> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.element {
  padding: 10px 15px;
  padding-bottom: 30px;
  border: 1px solid var(--gray-color);
  border-radius: 0.25rem;
  font-size: 0.875rem;
  background-color: #fff;
  cursor: grab;
  margin-bottom: 10px;
}

.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title > span{
  -ms-user-select:text; -moz-user-select: text; -webkit-user-select: text; user-select: text;
}
</style>