<script setup lang="ts">
import { ref } from 'vue';
import NavbarHeader from '../layout/navbar/NavbarHeader.vue';
import BoardList from '../layout/navbar/BoardList.vue'
import SheetList from '../layout/navbar/SheetList.vue'

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

const boards = ref([
    {id: 1, projectId: 1, name: 'Данила у меня жюхлы'},
    {id: 2, projectId: 2, name: 'ozontest githubpages'},
])

const sheets = ref([
    {id: 1, documentationId: 1, name: 'дакументац', body: ''},
    {id: 2, documentationId: 2, name: 'ozon spinner', body: ''},
])
</script>

<template>
    <div class="content">
        <NavbarHeader :isNavOpened="isNavOpened" @navOpenToggle="navOpenToggle"/>
        <!-- <div class="input-wrap">
            
        </div> -->
        <BoardList :elems="boards" :isNavOpened="isNavOpened" @navOpenTrue="navOpenTrue"/>
        <SheetList :elems="sheets" :isNavOpened="isNavOpened" @navOpenTrue="navOpenTrue"/>
    </div>
</template>

<style scoped>

    .content {
        display: flex;
        flex-direction: column;
    }
</style>