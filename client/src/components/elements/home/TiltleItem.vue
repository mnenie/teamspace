<script setup lang="ts">
import LineElement from '@/components/UI/LineElement.vue';
import { onMounted, ref, watch } from 'vue';
import FiltersElement from './FiltersElement.vue';
import { useProject } from '@/store/project';
import Dropdown from 'primevue/dropdown';

const project = useProject()
const storedSelectedProject = localStorage.getItem('selectedProject');
const choice = ref(storedSelectedProject ? JSON.parse(storedSelectedProject) : null);
const onSubmit = () => {
  project.chooseUrProject(choice.value);
}
watch([choice], () => {
  localStorage.setItem('selectedProject', JSON.stringify(choice.value));
});

onMounted(async () => {
  await project.getAllProjects(1)
})


</script>

<template>
  <div class="text">
    <div class="block_char">
      <span>{{ project.projects.length > 0 && project.project ? project.project.name.split('')[0].toUpperCase() : '' }}</span>
    </div>
    <Dropdown @change="onSubmit" v-model="choice" :options="project.projects" optionLabel="name"
      placeholder="Выберете проект" />
    <div class="block_status">
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