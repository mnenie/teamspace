<script lang="ts" setup>
import type { ITask } from '@/types/Task';
import Checkbox from 'primevue/checkbox';
import { computed, ref } from 'vue';
import { useBoard } from '../../../../store/board';
import { TaskStatus } from '@/types/consts';
interface Props {
  card: ITask;
}
const props = defineProps<Props>();


const board = useBoard()

const checked = ref(false);

const handleChecked = async () => {
  await board.completeTask(props.card.id!);
  checked.value = true;
  console.log(checked.value);
};
</script>
<template>
  <div class="element" :class="checked ? 'ckecked-card' : ''">
    <div class="title">
      <span style="color: var(--text-color);" class="title_span" :class="checked ? 'ckecked-span' : ''">{{ card.name
      }}</span>
      <div class="down-card">
        <Checkbox v-model="checked" :binary="true" @change="handleChecked" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ckecked-span {
  color: gray !important;
}

.ckecked-card {
  border: 2px solid var(--green-color) !important;
}

.element {
  padding: 10px 10px 0px 15px;
  padding-bottom: 30px;
  border: 2px solid var(--gray-color);
  border-radius: 0.25rem;
  font-size: 0.875rem;
  background-color: #fff;
  cursor: grab;
  margin-bottom: 10px;
  height: 80px;
}

.element:hover .pi-trash {
  color: var(--text-color);
}

.title {
  display: flex;
  height: 60px;
  /* align-items: center; */
  justify-content: space-between;
  flex-direction: column;
}

.title>span {
  display: flex;
  max-width: 230px;
  -ms-user-select: text;
  -moz-user-select: text;
  -webkit-user-select: text;
  user-select: text;
}

.down-card {
  display: flex;
  justify-content: right;
}

.pi-trash {
  font-size: 12px;
  margin-left: 2px;
  color: transparent;
  cursor: pointer;
}

.pi-trash:hover {
  color: red !important;
}
</style>