<script setup lang="ts">

</script>

<template>
  <button class="btn">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  padding: 11px 22px;
  width: 100%;
  font-size: 14px;
  font-variation-settings: "wght" 600;
  line-height: 22px;
  color: #fff;
  background-color: var(--green-btn-color);
  border-radius: 8px;
  border: none;
  outline: none;
  transition: 0.10s ease-in;
}

.btn:hover {
  opacity: 0.8;
}
</style>