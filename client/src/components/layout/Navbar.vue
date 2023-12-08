<script setup lang="ts">
import ModalElement from '../UI/ModalElement.vue';
</script>

<template>
  <div class="navbar opened transition_all">
    <ModalElement />
  </div>
</template>

<style scoped>
.navbar {
  /* position: fixed;
  z-index: 999; */
  height: 100vh;
  border-right: 1px solid var(--green-color);
  width: 120px;
  flex: none;
  overflow: hidden;
  background-color: #fff;
  transition: .3s ease-in-out;
  display: grid;
  grid-template-rows: max-content 1fr;
}

.opened {
  width: 275px;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  transition-duration: .15s;
}
</style>