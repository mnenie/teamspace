<script setup lang="ts">
import { ref } from 'vue';
import ModalElement from '../UI/ModalElement.vue';

const isNavOpened = ref<boolean>(true)

const navOpenToggle = () => {
  isNavOpened.value = !isNavOpened.value;
};

const navOpenTrue = () => {
  isNavOpened.value = true;
};
</script>

<template>
  <div class="navbar transition_all" :class="isNavOpened ? 'opened' : ''">
    <ModalElement :isNavOpened="isNavOpened" @navOpenToggle="navOpenToggle" @navOpenTrue="navOpenTrue"/>
  </div>
</template>

<style scoped>
.navbar {
  height: 100vh;
  border-right: 1.3px solid var(--gray-color);
  width: 65px;
  background-color: #fff;
  transition: .2s ease-in-out;
  display: grid;
  grid-template-rows: max-content 1fr;
}

.opened {
  width: 275px;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  transition-duration: .55s;
}
</style>