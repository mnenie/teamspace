<script setup lang="ts">
import ModalEditBoard from '@/components/UI/ModalEditBoard.vue';
import {ModalsContainer, useModal} from 'vue-final-modal'
import { useBoard } from '@/store/board';
import { useRouter } from 'vue-router';
import { BOARD_ROUTE } from '@/utils/consts';
interface IBoard{
    id? : number;
    projectId : number;
    name : string;
    
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
interface Props {
    elems: IBoard[]
    isNavOpened:boolean
}
const props = defineProps<Props>()

const board = useBoard();

const emit = defineEmits(['navOpenTrue']);

const navOpenTrue = () => {
  emit('navOpenTrue');
};

const {open, close} = useModal({
  component: ModalEditBoard,
  attrs:{
    onConfirm(){
      close()
    },
    onClose(){
      close()
    }
  }
  
})

const router = useRouter();

const handle =  (board : IBoard) => {
    board.boardInfo = board 
    router.push(BOARD_ROUTE + '/' + board.id);
}

</script>

<template>
    <li v-for="elem in elems" :key="elem.id" :name="elem.name" @click="handle(elem)">
        <a class="item" :class="!isNavOpened ? 'item-closed' : ''" @click="navOpenTrue">
            <div class="left">
                <i class="pi pi-th-large icon" :class="!isNavOpened ? 'icon-closed' : ''"></i>
                <span
                v-if="isNavOpened"
                class="name"
                >{{ elem.name }}</span>
            </div>
            <div class="right" @click="open" v-if="isNavOpened">
                <i
                    class="pi pi-pencil"
                >
                </i>
            </div>
        </a>
    </li>
    <ModalsContainer />
</template>


<style scoped>
.item-closed {
    width: 45px !important;
    justify-content: center;
}

.icon-closed {
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
    margin-left: 5px;
}

.pi-pencil {
    color: var(--white-color);
    font-size: 10px;
}
.pi-pencil:hover {
    color: var(--green-btn-color) !important;
}

.name {
    color: var(--text-color);
    font-size: 13px;
    width: 190px;
}
</style>