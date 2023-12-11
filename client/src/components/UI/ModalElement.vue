<script setup lang="ts">
import { ref, onMounted } from 'vue';
import NavbarHeader from '../layout/navbar/NavbarHeader.vue';
import BoardList from '../layout/navbar/BoardList.vue'
import SheetList from '../layout/navbar/SheetList.vue'
import { IRoom } from '@/types/Room';
import ChatPage from '@/pages/ChatPage.vue';
import ChatService from '@/services/ChatService';
import ChatList from '../layout/navbar/ChatList.vue';
import { useProject } from '../../store/project';
import { useBoard } from '../../store/board';

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
    {id: 1, documentationId: 1, name: 'дакументац', body: ''},
    {id: 2, documentationId: 2, name: 'ozon spinner', body: ''},
])

const chats = ref<IRoom[]>([]);


const project = useProject()
const board = useBoard()

onMounted(async () => {
    const resp = await ChatService.getRoomsByProjectId(project.project.id!);
    chats.value = resp.data
    await board.getBoardsByProject(project.project.id!)
})

</script>

<template>
    <div class="content">
        <NavbarHeader :isNavOpened="isNavOpened" @navOpenToggle="navOpenToggle"/>
        <!-- <div class="input-wrap">
            
        </div> -->
        <BoardList :elems="board.boards" :isNavOpened="isNavOpened" @navOpenTrue="navOpenTrue"/>
        <SheetList :elems="sheets" :isNavOpened="isNavOpened" @navOpenTrue="navOpenTrue"/>
        <ChatList :elems="chats" :isNavOpened="isNavOpened" @navOpenTrue="navOpenTrue"/>

    </div>
</template>

<style scoped>

    .content {
        display: flex;
        flex-direction: column;
    }
</style>