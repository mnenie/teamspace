<template>
  <div class="not_found">
    .
    <span class="text">404</span>
    <button>go back</button>
    <div class="bg_fixed"></div>
  </div>
</template>

<style scoped>
.not_found {
  background: var(--white-color);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text{
  margin-top: 10%;
  color: var(--text-color);
  font-size: 200px;
}

.bg_fixed {
  position: fixed;
  background: linear-gradient(45deg, #00dc4a, #22c530 50%, #25ffc1);
  bottom: -30vh;
  left: 0;
  width: 100%;
  filter: blur(20vh);
  height: 40vh;
}
</style>