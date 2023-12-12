<script setup lang="ts">

</script>

<template>
  <div class="right_part">

  </div>
</template>

<style scoped>
.right_part {
  animation: gradient 15s ease infinite;
  background: linear-gradient(-45deg, #22c55e, #10b981, #84cc16, #23d5ab);
  background-size: 400% 400%;
  width: 100%;
  height: 100vh;
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