<script setup lang="ts">

</script>

<template>
    <div class="cont">
        <img class="logo" src="/icons/favicon.svg">
        <p class="logo-name">TeamSpace</p>
        <p class="message">Для наилучшего визуального опыта рекомендуем открыть сайт с компьютера.</p>
    </div>
</template>

<style scoped>
.cont {
    margin-top: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-left: 20px;
    margin-right: 20px;
}
.logo {
    width: 150px;
    height: 150px;
    margin: 0 auto;
    margin-bottom: 10px;
}
.logo-name {
    font-size: 65px;
    color: var(--text-color);
}
.message {
    margin-top: 40px;
    text-align: center;
    font-size: 25px;
    color: var(--text-color);
}
</style>