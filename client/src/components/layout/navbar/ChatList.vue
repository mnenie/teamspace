<script setup lang="ts">
import type { IRoom } from '@/types/Room';
import {ModalsContainer, useModal} from 'vue-final-modal'
import ChatEl from './ChatEl.vue';
import ModalAddChat from '@/components/UI/ModalAddChat.vue';


interface Props {
    elems: IRoom[]
    isNavOpened:boolean
}
const props = defineProps<Props>()

const emit = defineEmits(['navOpenTrue']);

const navOpenTrue = () => {
  emit('navOpenTrue');
};


const {open, close} = useModal({
  component: ModalAddChat,
  attrs:{
    onConfirm(){
      close()
    },
    onClose(){
      close()
    }
  },
})
</script>

<template>
    <div class="section">
        <div class="title">
            <span class="section__name">{{ isNavOpened ? 'Чаты' : 'Чаты' }}</span>
            <i @click="open" class="pi pi-plus-circle" v-if="isNavOpened"></i>
        </div>
        <ul class="secondary-ul">
            <ChatEl :elems="elems" :isNavOpened="isNavOpened" @navOpenTrue="navOpenTrue"/>
        </ul>
    </div>
    <ModalsContainer />
</template>

<style scoped>
.section {
    display: flex;
    flex-direction: column;
    padding: 10px;
}

.title {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.section__name {
    font-weight: 500;
    font-size: 13px;
    color: var(--text-gray-color);
    text-align: start;
    text-overflow: ellipsis;
    margin-left: 5px;
}

.pi-plus-circle {
    font-size: 13px;
    cursor: pointer;
    margin-right: 5px;
}

.pi-plus-circle:hover {
    color: var(--green-btn-color);
}

.secondary-ul {
    display: flex;
    flex-direction: column;
    align-items: left;
    margin-top: 10px;
}

</style>