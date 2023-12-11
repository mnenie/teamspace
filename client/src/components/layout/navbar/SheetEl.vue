<script setup lang="ts">
import ModalEditSheet from '@/components/UI/ModalEditSheet.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import {ModalsContainer, useModal} from 'vue-final-modal'

interface ISheet{
    id : number;
    documentationId : number;
    name :string;
    body : string;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
interface Props {
    elems: ISheet[]
    isNavOpened:boolean
}
const props = defineProps<Props>()

const emit = defineEmits(['navOpenTrue']);
const isPicking = ref<boolean>(false)
const pickedElement = ref<HTMLElement | null>();
const itemOptContainer = ref<HTMLElement | null>(null);
const options = ref<HTMLElement | null>(null);

const navOpenTrue = (event: MouseEvent) => {
    const clickedElement = event.currentTarget as HTMLElement;
    pickedElement.value = clickedElement;
    emit('navOpenTrue');
};

const {open, close} = useModal({
  component: ModalEditSheet,
  attrs:{
    onConfirm(){
      close()
    },
    onClose(){
      close()
    }
  }
})


// для обработки нажатия на три точки у другого элемента
const calculateItemOptStyle = () => {
  if (pickedElement.value) {
    const rect = pickedElement.value.getBoundingClientRect();
    return {
      top: `${rect.top}px`,
      left: `${rect.right}px`,
    };
  }
  return {};
};

function handleActiveClick(event: MouseEvent) {
    const clicked = event.currentTarget as HTMLElement;
    if (clicked.parentNode === pickedElement.value && isPicking.value) {
        isPicking.value = false
    } else {
        isPicking.value = true
    }
}

function handleArchive() {
    isPicking.value = false
}

function handleDelete() {
    isPicking.value = false
}
onMounted(() => {
    const closePicker = (event: MouseEvent) => {
        const clickedElement = event.target as HTMLElement;

        if (itemOptContainer.value && !itemOptContainer.value.contains(clickedElement) && !clickedElement.classList.contains('options2-icon')) {
            isPicking.value = false;
        }
    };

  document.addEventListener('click', closePicker);

onUnmounted(() => {
    document.removeEventListener('click', closePicker);
  });
});
</script>

<template>
    <li v-for="elem in elems" :key="elem.id" :name="elem.name">
        <a class="item" :class="!isNavOpened ? 'item-closed' : ''" @click="navOpenTrue($event as MouseEvent)">
            <div class="left">
                <i class="pi pi-book icon" :class="!isNavOpened ? 'icon-closed' : ''"></i>
                <span
                v-if="isNavOpened"
                class="name"
                >{{ elem.name }}</span>
            </div>
            <div class="right" @click="handleActiveClick($event as MouseEvent)" v-if="isNavOpened">
                <i
                    ref="options"
                    class="pi pi-ellipsis-h options2-icon"
                >
                </i>
            </div>
        </a>
    </li>
    <div class="item-opt" v-if="isPicking" :style="calculateItemOptStyle()" ref="itemOptContainer">
        <div class="opt" @click="open(), isPicking = false">
            <i class="pi pi-file-edit"></i>
            <span>Редактировать</span>
        </div>
        <div class="opt" @click="handleArchive">
            <i class="pi pi-inbox"></i>
            <span>Архивировать</span>
        </div>
        <div class="opt" @click="handleDelete">
            <i class="pi pi-trash"></i>
            <span>Удалить</span>
        </div>
    </div>
    <ModalsContainer />
</template>


<style scoped>
.item-opt {
    padding: 10px 5px;
    left: 250px;
    z-index: 999;
    width: 160px;
    position: fixed;
    background-color: white;
    box-shadow: 0 4px 13px #3030301a;
    border-radius: 7px;
}
.opt {
    display: flex;
    align-items: center;
    max-width: 150px;
    width: 100%;
    height: 30px;
    margin: 0 auto;
    padding: 5px;
    cursor: pointer;
    border-radius: 5px;
}
.opt:hover {
    background-color: var(--gray-color);
}
.opt > .pi {
    font-size: 14px;
    margin-right: 10px;
    margin-left: 5px;
}
.opt > span {
    font-size: 13px;
    color: var(--text-color);
}
.item-closed {
    width: 45px !important;
    justify-content: center;
}

.icon-closed {
    /* margin-left: 5px; */
    margin: 0 auto;
}

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
.item:hover .options2-icon{
    color: black;
}

.left {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.icon {
    margin-right: 10px;
    margin-left: 5px;
}

.options2-icon {
    color: var(--white-color);
    font-size: 14px;
}
.options2-icon:hover {
    color: var(--green-btn-color) !important;
}
.name {
    color: var(--text-color);
    font-size: 13px;
}
</style>