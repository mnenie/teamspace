<script setup lang="ts">

</script>

<template>
  <button class="btn">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  width: 135px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 40px;
  /* background: var(--green-color); */
  /* background: var(--column-green-color); */
  border: 1px solid #e3e3e3;
  /* border: none; */
  box-shadow: none;
  cursor: pointer;
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  animation: gradient 15s ease infinite;
  background: linear-gradient(-55deg, #6dca90, #2aa342, #67caa0);
  background-size: 400% 400%;
}
.btn:hover {
  opacity: 0.9;
}
.btn:focus {
  outline: none;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>