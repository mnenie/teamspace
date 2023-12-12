<script setup lang="ts">
import { ref, onMounted, watch, onBeforeMount, watchEffect } from 'vue';
import NavbarHeader from '../layout/navbar/NavbarHeader.vue';
import BoardList from '../layout/navbar/BoardList.vue'
import SheetList from '../layout/navbar/SheetList.vue'
import type { IRoom } from '@/types/Room';
import ChatPage from '@/pages/ChatPage.vue';
import ChatService from '@/services/ChatService';
import ChatList from '../layout/navbar/ChatList.vue';
import { useProject } from '../../store/project';
import { useBoard } from '../../store/board';
import { useChat } from '@/store/chats';
import ScrollPanel from 'primevue/scrollpanel';

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

const sheets = ref([
  { id: 1, documentationId: 1, name: 'дакументац', body: '' },
  { id: 2, documentationId: 2, name: 'ozon spinner', body: '' },
])

const chats = ref<IRoom[]>([]);


const project = useProject()
const board = useBoard()

watchEffect(() => {
  const projectId = project.project?.id;
  if (projectId) {
    (async () => {
      await chat.getChats(projectId);
      await board.getAllBoards(projectId);
    })();
  }
});
const chat = useChat();

onMounted(async () => {
  if (project.project.id) {
    await chat.getChats(project.project.id);
    console.log(1)
    await board.getAllBoards(project.project.id)
    console.log(2)
  }
});


</script>

<template>
  <div class="content">
    <NavbarHeader :isNavOpened="isNavOpened" @navOpenToggle="navOpenToggle" />
    <ScrollPanel style="width: 275px; height: 100vh">
      <BoardList :elems="board.boards" :isNavOpened="isNavOpened" @navOpenTrue="navOpenTrue" />
      <SheetList :elems="sheets" :isNavOpened="isNavOpened" @navOpenTrue="navOpenTrue" />
      <ChatList :elems="chat.chats" :isNavOpened="isNavOpened" @navOpenTrue="navOpenTrue" />
    </ScrollPanel>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
}
</style>