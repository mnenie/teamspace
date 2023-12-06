<script setup lang="ts">
import ButtonBurger from './ButtonBurger.vue';
</script>

<template>
    <div class="header">
        <span>Our Logo</span>
        <ButtonBurger>
            <i class="pi pi-align-right"></i>
        </ButtonBurger>
    </div>
</template>

<style scoped>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        padding: 10px;
    }
    .pi-align-right {
        font-size: 20px;
        color: var(--green-color);
    }
</style>