<script setup lang="ts">
import ModalEditSheet from '@/components/UI/ModalEditSheet.vue';
import router from '@/router';
import type { IRoom } from '@/types/Room';
import { ModalsContainer, useModal } from 'vue-final-modal'
import { useRouter } from 'vue-router';

interface Props {
    elems: IRoom[]
    isNavOpened: boolean
}
const props = defineProps<Props>()

const emit = defineEmits(['navOpenTrue']);
const navOpenTrue = () => {
    emit('navOpenTrue');
};

const { open, close } = useModal({
    component: ModalEditSheet,
    attrs: {
        onConfirm() {
            close()
        },
        onClose() {
            close()
        }
    }
})

const handle = () => {
    router.push( '/chat' );
}
</script>

<template>
    <li v-for="elem in elems" :key="elem.id" :name="elem.name" @click="handle">
        <a class="item" :class="!isNavOpened ? 'item-closed' : ''" @click="navOpenTrue">
            <div class="left">
                <i class="pi pi-envelope icon" :class="!isNavOpened ? 'icon-closed' : ''"></i>
                <span v-if="isNavOpened" class="name">{{ elem.name }}</span>
            </div>
            <div class="right" @click="open" v-if="isNavOpened">
                <i class="pi pi-pencil">
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

.item:hover .pi-pencil {
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
}
</style>