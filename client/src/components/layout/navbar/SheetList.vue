<script setup lang="ts">
import SheetEl from './SheetEl.vue'

interface ISheet{
    id : number;
    documentationId : number;
    name :string;
    body : string;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
interface Props {
    elems: ISheet[]
}
const props = defineProps<Props>()

</script>

<template>
    <div class="section">
        <div class="title">
            <span class="section__name">Документации</span>
            <i class="pi pi-plus-circle"></i>
        </div>
        <ul class="secondary-ul">
            <SheetEl :elems="elems"/>
        </ul>
    </div>
</template>

<style scoped>
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

</style>