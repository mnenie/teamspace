<script setup lang="ts">
import { onMounted, watchEffect } from 'vue';
import NavbarHeader from '../layout/navbar/NavbarHeader.vue';
import BoardList from '../layout/navbar/BoardList.vue'
import SheetList from '../layout/navbar/SheetList.vue'
import ChatList from '../layout/navbar/ChatList.vue';
import { useProject } from '../../store/project';
import { useBoard } from '../../store/board';
import { useChat } from '@/store/chats';
import {useDoc} from '@/store/docs';
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
const documentation = useDoc(); 
const project = useProject()
const board = useBoard()

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
const chat = useChat();

onMounted(async () => {
  if (project.project.id) {
    await chat.getChats(project.project.id);
    await board.getAllBoards(project.project.id)
    await documentation.getSheets(project.project.id)
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