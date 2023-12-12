<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'
import HeaderList from '@/components/elements/main/HeaderList.vue'
import Sidebar from 'primevue/sidebar';
import { ref } from 'vue';

const isBurgerMedia = useMediaQuery('(max-width: 850px)')
const openBurger = ref<boolean>(false)
</script>

<template>
    <header>
        <div class="container header-cont">
            <a href="" class="logo">TeamSpace</a>
            <div class="mid" v-if="!isBurgerMedia">
                <HeaderList :openBurger="false"/>
            </div>
            <div class="right">
                <button class="login">Войти</button>
                <button class="signup">Регистрация</button>
                <i class="pi pi-align-justify burger" v-if="isBurgerMedia" @click="openBurger = true"></i>
            </div>
        </div>
    </header>
    <Sidebar v-model:visible="openBurger" header="TeamSpace" position="right">
        <div class="sidebar-cont">
            <HeaderList :openBurger="openBurger"/>
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
}
.login:hover {
    background-color: var(--gray-color);
}
.signup {
    width: 120px;
    height: 40px;
    border: none;
    border: 2px solid var(--green-btn-color);
    border-radius: 8px;
    background: var(--green-btn-color);
    color: white;
    font-weight: 700;
}
.signup:hover {
    opacity: 0.8;
}
.burger {
    margin-left: 35px;
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
.sidebar-cont > a{
    margin-top: 20px;
}
</style>