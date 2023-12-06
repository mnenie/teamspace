<script setup lang="ts">
import ModalElement from '../UI/ModalElement.vue';
</script>

<template>
  <div class="navbar opened">
    <ModalElement />
  </div>
</template>

<style scoped>
.navbar{
  height: 100vh;
  /* padding: 20px 0; */
  border-right: 1px solid var(--green-color);
  width: 120px;
  flex: none;
  display: grid;
  width: 60px;
  overflow: hidden;
  background-color: #fff;
  transition: .3s ease-in-out;
}

.opened {
  width: 275px;
}
</style>