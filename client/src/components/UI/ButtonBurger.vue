<script setup lang="ts">

</script>

<template>
  <button class="btn">
    <slot />
  </button>
</template>

<style scoped>
.btn{
  width: 50px;
  height: 50px;
  border: 2px solid var(--green-color);
  border-radius: 10px;
  background-color: var(--white-color);
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn:hover{
  background-color: var(--gray-color);
}
</style>