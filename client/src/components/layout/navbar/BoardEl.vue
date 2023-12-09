<script setup lang="ts">
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import TextInput from '../../UI/TextInput.vue';
import Button from 'primevue/button';

interface IBoard{
    id : number;
    projectId : number;
    name : string;
    
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
interface Props {
    elems: IBoard[]
}
const props = defineProps<Props>()

const dialogPlaceholder = ref<string>('Введите новое название')
const newName = ref<string>('')
let clickedItemId:number
const isEditing = ref<boolean>(false)

function handleEdit(id: number) {
    clickedItemId = id
    isEditing.value = true
    newName.value = ''
}

function handleSubmit() {
    //запрос с изменением newName на базу данных, зная айдишник 
    //зная, что это для Досок

    isEditing.value = false
    newName.value = ''
}

</script>

<template>
    <li v-for="elem in elems" :key="elem.id" :name="elem.name">
        <a class="item">
            <div class="left">
                <i class="pi pi-file icon"></i>
                <input
                    type="text" 
                    :value="elem.name"
                    disabled="true"
                />
            </div>
            <div class="right" @click="handleEdit(elem.id)">
                <i
                    class="pi pi-pencil"
                >
                </i>
            </div>
        </a>
    </li>
    <Dialog v-model:visible="isEditing" modal header="Выберите новое название" :style="{ width: '400px' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div class="text-input__wrapper">
            <TextInput v-model="newName" :placeholder="dialogPlaceholder" />
        </div>
        <template #footer>
            <Button label="Применить" @click="handleSubmit" autofocus :style="{width: '120px', height: '40px', margin: '15px 20px 10px 10px'}"/>
        </template>
    </Dialog>
</template>


<style scoped>
li {
    margin-top: 1px;
}

.item {
    height: 40px;
    width: 100%;
    padding: 10px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
}

.item:hover {
    background-color: var(--gray-color);
}
.item:hover .pi-pencil{
    color: black;
}

.left {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.icon {
    margin-right: 10px;
}

.pi-pencil {
    color: var(--white-color);
    font-size: 10px;
}
.pi-pencil:hover {
    color: var(--green-color) !important;
}
input {
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
}

.add-border {
    border-bottom: 1px solid var(--green-color);
}

input::placeholder {
    color: transparent;
}

input:focus::placeholder {
    color: #000;
}

.text-input__wrapper {
    padding: 10px 20px;
}
</style>