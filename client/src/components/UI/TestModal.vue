<script setup lang="ts">
import { ref } from 'vue';
import ButtonBurger from './ButtonBurger.vue';
import InputText from 'primevue/inputtext';

const value = ref<string>('')
// const visible = ref<boolean>(true)

// const changeModalValue = () => {
//   visible.value = !visible.value
// }
</script>

<template>
    <div class="content">
        <div class="header">
            <span>Our Logo</span>
            <ButtonBurger>
                <i class="pi pi-align-right btn-icon"></i>
            </ButtonBurger>
        </div>
        <div class="input-wrap">
            <span class="p-input-icon-left">
                <i class="pi pi-search"></i>
                <InputText v-model="value" placeholder="Search" />
            </span>
        </div>
    </div>
</template>

<style scoped>

    .content {
        display: flex;
        flex-direction: column;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        padding: 5px 10px;
        background-color: aqua;
    }
    .input-wrap {
        height: 60px;
    }
    .btn-icon {
        font-size: 20px;
        color: var(--green-color);
    }
</style>