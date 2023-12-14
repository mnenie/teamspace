<script setup lang="ts">
import { onMounted, watchEffect,ref } from 'vue';
import NavbarHeader from '../layout/navbar/NavbarHeader.vue';
import BoardList from '../layout/navbar/BoardList.vue'
import SheetList from '../layout/navbar/SheetList.vue'
import ChatList from '../layout/navbar/ChatList.vue';
import { useProject } from '../../store/project';
import { useBoard } from '../../store/board';
import { useChat } from '@/store/chats';
import {useDoc} from '@/store/docs';
import RoadMapList from '../layout/navbar/RoadMapList.vue';
import type {IRoom} from '@/types/Room'
interface Props {
  isNavOpened: boolean
}
const props = defineProps<Props>()

const emit = defineEmits(['navOpenToggle', 'navOpenTrue']);

const navOpenToggle = () => {
  emit('navOpenToggle');
};

const navOpenTrue = () => {
  emit('navOpenTrue');
};
const chat = useChat();
const documentation = useDoc(); 
const project = useProject()
const board = useBoard()
const roadMaps = ref<IRoom[]>(
  [{name : "Весь проект", id : 1,projectId:11},{name : "Фронтенд", id : 2,projectId:11},{name : "Бекенд", id : 3,projectId:11}]
);
watchEffect(() => {
  const projectId = project.project?.id;
  if (projectId) {
    (async () => {
      await chat.getChats(projectId);
      await board.getAllBoards(projectId);
      await documentation.getSheets(projectId);
    })();
  }
});

onMounted(async () => {
  if (project.project.id) {
    await chat.getChats(project.project.id);
    await board.getAllBoards(project.project.id)
    await documentation.getSheets(project.project.id)
    await project.getMembers(project.project.id);
  }
});


</script>

<template>
  <div class="content">
    <NavbarHeader :isNavOpened="isNavOpened" @navOpenToggle="navOpenToggle" />
    <div class="list">
      <BoardList :elems="board.boards" :isNavOpened="isNavOpened" @navOpenTrue="navOpenTrue" />
      <SheetList :elems="documentation.sheets" :isNavOpened="isNavOpened" @navOpenTrue="navOpenTrue" />
      <ChatList :elems="chat.chats" :isNavOpened="isNavOpened" @navOpenTrue="navOpenTrue" />
      <RoadMapList :elems="roadMaps" :is-nav-opened="isNavOpened" @navOpenTrue="navOpenTrue"/>
    </div>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
}
.list {
  overflow-y: auto;
  height: 90vh;
}
::-webkit-scrollbar {
    width: 0;
}

::-webkit-scrollbar-track {
    background-color: transparent;
}

::-webkit-scrollbar-thumb {
    background-color: transparent;
}
</style>