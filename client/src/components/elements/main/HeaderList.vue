<script setup lang="ts">

interface Props {
    openBurger?:boolean
}
const props = defineProps<Props>()
</script>

<template>
    <a href="#projects" class="item" :class=" openBurger ? 'inBurgerStyles' : ''">Проекты</a>
    <a href="#boards" class="item" :class=" openBurger ? 'inBurgerStyles' : ''">Доски</a>
    <a href="#sheets" class="item" :class=" openBurger ? 'inBurgerStyles' : ''">Документации</a>
    <a href="#chats" class="item" :class=" openBurger ? 'inBurgerStyles' : ''">Чаты</a>
    <a href="#roadmaps" class="item" :class=" openBurger ? 'inBurgerStyles' : ''">Дорожные карты</a>
</template>

<style scoped>
.item{
    color: var(--text-color);
    margin-right: 20px;
    border-bottom: 2px solid transparent;
}
.item:hover{
    border-bottom: 2px solid var(--green-btn-color);
}
.inBurgerStyles {
    margin-top: 10px;
    margin-left: 15px;
    width: 80px;
}
.inBurgerStyles:hover {
    border-bottom: none;
}
.inBurgerStyles:first-child {
    margin-top: 0px;
}
</style>