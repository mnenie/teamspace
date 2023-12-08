<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const { value } = defineProps(['value']);
const emits = defineEmits(['input']);

// Обработчик изменения значения в инпуте
const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emits('input', target.value);
}

</script>

<template>
  <span class="p-input-icon-left">
    <i class="pi pi-search"></i>
    <input :value="value" @input="handleChange" type="text" class="styledInput" placeholder="Поиск">
  </span>
</template>


<style scoped>
    .p-input-icon-left {
        display: block;
        width: 100%;
        position: relative;
        display: inline-block;
    }

    .p-input-icon-left > i,
    .p-input-icon-left > svg {
        position: absolute;
        top: 50%;
        margin-top: -9px;
    }

    .styledInput {
        margin: 0;
        height: 50px;
        width: 100%;
        padding: 10px 0 10px 35px;
        font-family: sans-serif;
        color: #4a5568;
        background-color: #ffffff;
        border-width: 1px;
        border-color: black;
        transition-property: color;
        transition-duration: 200ms;
        appearance: none;
        border-radius: 8px;
    }

    .styledInput:hover {
        border-color: var(--green-color);
    }

    .styledInput:focus {
        outline: none;
        outline-offset: 0;
        box-shadow: 0 0 0 0.1rem var(--green-color);
    }
</style>