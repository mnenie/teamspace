<script setup lang="ts">
import LineElement from '@/components/UI/LineElement.vue';
import { onMounted, onBeforeMount, ref, watch } from 'vue';
import FiltersElement from './FiltersElement.vue';
import { useProject } from '@/store/project';
import Dropdown from 'primevue/dropdown';
import { useRouter } from 'vue-router';
import { BOARD_ROUTE, HOME_ROUTE } from "@/utils/consts"
import { useUser } from '@/store/user';
import { useBoard } from '../../../store/board';
const project = useProject()
const router = useRouter()
const board = useBoard()
const storedSelectedProject = localStorage.getItem('selectedProject');
const choice = ref(storedSelectedProject ? JSON.parse(storedSelectedProject) : null);
const onSubmit = () => {
  project.chooseUrProject(choice.value);
}
watch([choice], async () => {
  localStorage.setItem('selectedProject', JSON.stringify(choice.value));
  await board.getBoardsByProject(choice.value.id)
  if (choice.value) {
    const selectedBoard = board.boards.find(board => board.id);
    if (selectedBoard) {
      router.push(BOARD_ROUTE + '/' + selectedBoard.id);
    }
  }
});
onMounted(async () => {
  const user = JSON.parse(localStorage.getItem('user') as string)
  await project.getAllProjects(user.id)
})
</script>

<template>
  <div class="text">
    <div class="block_char">
      <span>{{ project.projects.length > 0 && project.project ? project.project.name.split('')[0].toUpperCase() : ''
      }}</span>
    </div>
    <Dropdown @change="onSubmit" v-model="choice" :options="project.projects" optionLabel="name"
      placeholder="Выберите проект" />
    <div v-if="project.projects" class="block_status">
      <span>активно</span>
    </div>
  </div>
  <LineElement />
  <FiltersElement />
</template>

<style scoped>
.text {
  display: flex;
  align-items: center;
  gap: 10px;
}

.block_char {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background: var(--proj-color);
}

.block_char>span {
  color: var(--white-color);
}

.text .title {
  font-weight: 500;
}

.block_status {
  position: relative;
  display: flex;
  gap: 10px;
  align-items: center;
  padding-left: 23px;
  color: #202430;
  white-space: nowrap;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  height: 16px;
  border-radius: 4px;
  background: #e8e8f2;
  padding-right: 4px;
}

.block_status::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 5px;
  height: 8px;
  width: 8px;
  border-radius: 50%;
  transform: translateY(-50%);
  background: #359f39;
}

.block_status>span {
  /* ник нужны стили */
}
</style>