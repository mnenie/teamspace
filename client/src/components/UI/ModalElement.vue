x<script setup lang="ts">
import { ref } from 'vue';
import NavbarHeader from '../elements/home/NavbarHeader.vue';
import TextInput from './TextInput.vue';
import BoardList from '../elements/home/BoardList.vue'
import DocumentationList from '../elements/home/DocumentationList.vue'

const inputValue = ref<string>('');

const boards = ref([
    {id: 1, projectId: 1, name: 'Данила у меня жюхлы'},
    {id: 2, projectId: 2, name: 'ozontest githubpages'},
])
const documentations = ref([
    {id: 1, projectId: 1, name: 'дакументац'},
    {id: 2, projectId: 2, name: 'ozon spinner'},
])

// const handleInput = (value: string) => {
//   inputValue.value = value;
// }
</script>

<template>
    <div class="content">
        <NavbarHeader />
        <div class="input-wrap">
            <TextInput v-model="inputValue" />
        </div>
        <BoardList :boards="boards"/>
        <DocumentationList :documentations="documentations" />
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