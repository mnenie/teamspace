<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'
import HeaderList from '@/components/elements/main/HeaderList.vue'
import Sidebar from 'primevue/sidebar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { AUTH_ROUTE, HOME_ROUTE, REGISTRATION_ROUTE } from '@/utils/consts';
import { useUser } from '@/store/user';
import { useProject } from '../../../store/project';
import { BOARD_ROUTE } from '../../../utils/consts';
import { useBoard } from '@/store/board';

const isBurgerMedia = useMediaQuery('(max-width: 850px)')
const openBurger = ref<boolean>(false)

const router = useRouter()
const project = useProject()
const user = useUser()
const board = useBoard()
if (localStorage.getItem('token')) {
    user.isAuth = true
    user.user = JSON.parse(localStorage.getItem('user') as string)
}
const projects = localStorage.getItem('selectedProject')
const projId = projects ? JSON.parse(projects)?.id : null;
const goToHome = async () => {
    if (localStorage.getItem('selectedProject')) {
        await board.getBoardsByProject(projId)
        const selectedBoard = board.boards.find(board => board.id);
        router.push(BOARD_ROUTE + '/' + selectedBoard?.id)
    }
    else {
        router.push(HOME_ROUTE)
    }
}
const token = localStorage.getItem('token')
</script>

<template>
    <header>
        <div class="container header-cont">
            <div style="display:flex;align-items: center;" class="sir">
                <img style="width:48px; height:48px; margin-right:15px" src="/icons/favicon.svg">
                <p class="logo">TeamSpace</p>
            </div>
            <div class="mid" v-if="!isBurgerMedia">
                <HeaderList :openBurger="false" />
            </div>

            <div v-if="!token" class="right">
                <button @click="router.push(AUTH_ROUTE)" class="login">Войти</button>
                <button @click="router.push(REGISTRATION_ROUTE)" class="signup">Регистрация</button>
                <i class="pi pi-align-justify burger" v-if="isBurgerMedia" @click="openBurger = true"></i>
            </div>
            <button v-else @click="goToHome" class="signup">К проектам</button>
        </div>
    </header>
    <Sidebar v-model:visible="openBurger" header="TeamSpace" position="right">
        <div class="sidebar-cont">
            <HeaderList :openBurger="openBurger" />
        </div>
    </Sidebar>
</template>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70.8px;
    border-bottom: 1.3px solid var(--gray-color);
    position: fixed;
    background: rgba(255, 255, 255, 0.76);
    backdrop-filter: blur(1rem);
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
}

.header-cont {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo {
    color: var(--text-color);
    font-size: 30px;
    margin-right: 10px;
}

.mid {
    display: flex;
    align-items: center;
}

.right {
    display: flex;
    align-items: center;
}

.login {
    width: 70px;
    height: 40px;
    border: 2px solid var(--green-btn-color);
    border-radius: 8px;
    background: white;
    color: var(--green-btn-color);
    font-weight: 700;
    margin-right: 20px;
    transition: 0.10s ease-in;
}

.login:hover {
    background-color: var(--green-btn-color);
    color: white;
}

.signup {
    width: 120px;
    height: 40px;
    border: none;
    border: 2px solid var(--green-btn-color);
    border-radius: 8px;
    background: var(--green-btn-color);
    color: white;
    transition: 0.10s ease-in;
    font-weight: 700;
}

.signup:hover {
    background-color: var(--white-color);
    color: var(--green-btn-color);
}

.burger {
    margin-left: 15px;
    font-weight: 600;
    color: var(--green-btn-color);
    font-size: 20px;
    cursor: pointer;
}

.sidebar-cont {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: left;
}

.sidebar-cont>a {
    margin-top: 20px;
}
</style>