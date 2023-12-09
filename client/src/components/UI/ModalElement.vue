x<script setup lang="ts">
import { ref } from 'vue';
import NavbarHeader from '../layout/navbar/NavbarHeader.vue';
import TextInput from './TextInput.vue';
import BoardList from '../layout/navbar/BoardList.vue'
import SheetList from '../layout/navbar/SheetList.vue'

const inputValue = ref<string>('');
const dialogPlaceholder = ref<string>('Поиск по названию')

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
        <NavbarHeader />
        <div class="input-wrap">
            <TextInput v-model="inputValue" :placeholder="dialogPlaceholder"/>
        </div>
        <BoardList :elems="boards"/>
        <SheetList :elems="sheets"/>
    </div>
</template>

<style scoped>

    .content {
        display: flex;
        flex-direction: column;
    }
    .input-wrap {
        height: 70px;
        padding: 10px;
    }
</style>