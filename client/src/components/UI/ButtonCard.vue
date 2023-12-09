<script setup lang="ts">

</script>


<template>
 <button class="btn">
  <slot />
 </button>
</template>


<style scoped>
.btn{
  width: 100%;
  height: 46px;
  border-radius: 10px;
  border: none;
  color: var(--text-color);
  background-color: var(--column-green-color);
}
</style>