<template>
  <div class="not_found">
    <div class="text_with_btn">
      <span class="text">404</span>
      <button class="btn">go back</button>
    </div>
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
.text_with_btn{
  margin-top: 10%;
  display: flex;
  flex-direction: column;
}
.text {
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

.btn{
  
}
</style>