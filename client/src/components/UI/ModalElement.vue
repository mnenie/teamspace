<script setup lang="ts">
import { ref } from 'vue';
import NavbarHeader from './NavbarHeader.vue';
import TextInput from './TextInput.vue';

const inputValue = ref<string>('');

// Обработчик изменения значения в дочернем компоненте
const handleInput = (value: string) => {
  inputValue.value = value;
}
</script>

<template>
    <div class="content">
        <NavbarHeader />
        <div class="input-wrap">
            <TextInput :value="inputValue" @input="handleInput" />
        </div>
        <div class="section">
            <div class="title">
                <span class="section__name">Доски</span>
                <i class="pi pi-plus-circle"></i>
            </div>
            <ul class="secondary-ul">
                <li>
                    <a class="item">
                        <i class="pi pi-pencil"></i>
                        <span class="icon__name">Доска жухлого</span>
                    </a>
                </li>
                <li>
                    <a class="item">
                        <i class="pi pi-pencil"></i>
                        <span class="icon__name">Доска жухлого</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>

    .content {
        display: flex;
        flex-direction: column;
    }
    .input-wrap {
        height: 70px;
        padding: 10px;
    }

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
        /* overflow: hidden; */
        /* white-space: nowrap; */
        color: var(--text-gray-color);
        text-align: start;
        text-overflow: ellipsis;
    }
    .pi-plus-circle {
        font-size: 13px;
        cursor: pointer;
    }
    .pi-plus-circle:hover {
        color: var(--green-color);
    }
    .secondary-ul {
        display: flex;
        flex-direction: column;
        align-items: left;
        margin-top: 10px;
    }
    .secondary-ul > li {
        margin-top: 1px;
    }
    .item {
        height: 40px;
        width: 100%;
        padding: 10px;
        border-radius: 7px;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .item:hover {
        background-color: var(--gray-color);
    }
    .pi-pencil {
        margin-right: 10px;
    }
    .icon__name {
        font-size: 15px;
    }

</style>