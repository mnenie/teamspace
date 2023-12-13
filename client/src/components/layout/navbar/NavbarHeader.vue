<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useProject } from '../../../store/project';
import { useUser } from '@/store/user';

interface Props {
    isNavOpened: boolean
}
const props = defineProps<Props>()

const project = useProject()
const emit = defineEmits(['navOpenToggle']);

const navOpenToggle = () => {
    emit('navOpenToggle');
};

const setTitle = ref(localStorage.getItem('selectedProject'))
onMounted(() => {
    project.project = setTitle.value ? JSON.parse(setTitle.value) : null
})
const user = useUser()
if (localStorage.getItem('token')) {
  user.isAuth = true
  user.user = JSON.parse(localStorage.getItem('user') as string)
}
</script>

<template>
    <div class="header">
        <div class="cont">
            <div class="circle">
                <span>{{ user.user && user.user.username ? user.user.username.split(' ').map(word => word.charAt(0)).join('') : '' }}</span>
            </div>
            <div v-if="isNavOpened" class="right">
                <span class="proj">Проект</span>
                <span class="proj-name"><nobr>{{ project.projects.length > 0 && project.project ? project.project.name : '' }}</nobr></span>
            </div>
        </div>
        <i v-if="isNavOpened" class="pi pi-angle-double-left" @click="navOpenToggle"></i>
        <i v-if="!isNavOpened" class="pi pi-angle-double-right" @click="navOpenToggle"></i>
    </div>
</template>



<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70.8px;
    padding: 10px;
    border-bottom: 1.3px solid var(--gray-color);
}

.cont {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.circle {
    border-radius: 50%;
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--green-color);
    margin-right: 10px;
    cursor: pointer;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
}

.circle>span {
    color: var(--white-color);
    font-size: 20px;
}

.right {
    margin-left: 5px;
    display: flex;
    flex-direction: column;
}

.proj {
    font-weight: 500;
    font-size: 13px;
    color: var(--text-gray-color);
    text-align: start;
    text-overflow: ellipsis;
    margin-bottom: 5px;
}

.proj-name {
    display: inline-block;
    width: 100px;
}

.pi-align-right {
    font-size: 20px;
    color: var(--green-color);
}

.pi {
    font-size: 20px;
    color: var(--text-color);
    cursor: pointer;
}

.pi:hover {
    color: #a5a6a7;
}

.pi-angle-double-right {
    font-size: 13px;
    position: fixed;
    top: 54px;
    left: 49px;
    transition: all 0.3s ease;
}
</style>