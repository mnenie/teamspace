<script setup lang="ts">

</script>

<template>
  <button class="btn">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  width: 120px;
  height: 40px;
  background: var(--green-btn-color);
  border: 1px solid var(--green-btn-color);
  box-shadow: none;
  cursor: pointer;
  border-radius: 6px;
}
.btn:hover {
  /* background: rgb(79, 130, 132); */
  opacity: 0.8;
}
</style>