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
  background: var(--green-color);
  border: 1px solid var(--green-color);
  box-shadow: none;
  cursor: pointer;
  border-radius: 6px;
}
.btn:hover {
  background: rgb(236, 161, 50);
}
</style>