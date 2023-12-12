<script setup lang="ts">
import {ModalsContainer, useModal} from 'vue-final-modal'
import ModalAddColumn from '@/components/UI/ModalAddColumn.vue';

const props = defineProps();

const {open, close} = useModal({
  component: ModalAddColumn,
  attrs:{
    // elems : props.elems
    onConfirm(){
      close()
    },
    onClose(){
      close()
    }
  }
})
</script>

<template>
  <div class="column">
    <div @click="open" class="custom-button">
      <p class="custom-text">+ Добавить колонку</p>
    </div>
    <ModalsContainer />
  </div>
</template>

<style scoped>
.column {
  display: flex;
  align-items: center;
  min-height: 100%;

}

.custom-button {
  height: 100%;
  display: flex;
  align-items: center;
  min-width: 280px;
  cursor: pointer;
  border-radius: 0.375rem;
  width: 18rem;
  flex: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem;
  background-color: var(--white-color);
  height: 100%;
  position: relative;
  color: var(--text-color);
}

.custom-text {
  font-size: 1.5rem;
  text-align: center;
  width: 100%;
  font-weight: bold;
  user-select: none;
}
</style>
