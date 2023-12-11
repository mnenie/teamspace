<script setup lang="ts">
import ModalAddBoard from '@/components/UI/ModalAddBoard.vue';
import {ModalsContainer, useModal} from 'vue-final-modal'
import BoardEl from './BoardEl.vue'
import type { IBoard } from '@/types/Board';
interface Props {
    elems: IBoard[]
    isNavOpened:boolean
}
const props = defineProps<Props>()

const emit = defineEmits(['navOpenTrue']);

const navOpenTrue = () => {
  emit('navOpenTrue');
};

const {open, close} = useModal({
  component: ModalAddBoard,
  attrs:{
    onConfirm(){
      close()
    },
    onClose(){
      close()
    }
  }
})
</script>

<template>
    <div class="section">
        <div class="title">
            <span class="section__name">Доски</span>
            <i @click="open" class="pi pi-plus-circle" v-if="isNavOpened"></i>
        </div>
        <ul class="secondary-ul">
            <BoardEl :elems="elems" :isNavOpened="isNavOpened" @navOpenTrue="navOpenTrue"/>
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