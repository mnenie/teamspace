<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

interface Item {
    id: number;
    projectId?: number;
    name: string;
}
interface Props {
    elems: Item[]
}
const props = defineProps<Props>()


const isInputDisabled = ref<boolean>(true);
const iconRef = ref<HTMLInputElement | null>(null);

function handleIconClick() {
    isInputDisabled.value = false;

    document.querySelector('.item input')?.classList.add('add-border')
}

function handleEdit(event: KeyboardEvent) {
    document.querySelector('.item input')?.classList.remove('add-border');

    isInputDisabled.value = true;
}

function handleCancelEdit(event: MouseEvent) {
    const target = event.target as HTMLElement
   
    // за пределами инпута и иконки
    if (target.tagName !== 'INPUT' && target.tagName !== 'I') {
        document.querySelector('.item input')?.classList.remove('add-border');

        isInputDisabled.value = true;
    }
}

onMounted(() => {
    // Добавляем обработчик события click для всего документа
    document.addEventListener('click', handleCancelEdit);
});

// Удаляем обработчик события click при уничтожении компонента
onBeforeUnmount(() => {
    document.removeEventListener('click', handleCancelEdit);
});
</script>

<template>
    <li v-for="elem in elems" :key="elem.id" :name="elem.name">
        <a class="item">
            <div class="left">
                <i class="pi pi-file icon"></i>
                <input
                    type="text" 
                    :value="elem.name"
                    :disabled="isInputDisabled"
                    @keydown.enter.prevent="handleEdit"
                />
            </div>
            <div class="right" @click="handleIconClick">
                <i
                    class="pi pi-pencil"
                    ref="iconRef"
                ></i>
            </div>
        </a>
    </li>
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

</style>