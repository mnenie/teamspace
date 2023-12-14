<script setup lang="ts">
import HeaderMain from '@/components/elements/main/HeaderMain.vue'
import MainPageServices from '@/components/elements/main/MainPageServices.vue'
</script>

<template>
  <div>
    <HeaderMain />
    <p class="slogan">TeamSpace: Ваш проект, наш <span>Agile!</span></p>
    <div class="slogan-description">
      <span>TeamSpace — ваш надежный напарник в управлении проектами! Взгляните на свой проект с новой перспективой, где каждый этап разработки становится частью нашего Agile взаимодействия. С нами ваш проект приобретает гибкость, прозрачность и эффективность.</span>
    </div>
    <!-- <img class="under-slogan" src="/img/sir.jpg" alt=""> -->
    <MainPageServices />
    <footer>
      <div class="line"></div>
      <span>@ Все права защищены.</span>
    </footer>
  </div>
</template>

<style scoped>
.slogan {
  font-size: 60px;
  text-align: center;
  font-weight: 400;
  color: var(--text-color);
  margin-top: 100px;
}
.slogan > span{
  color: var(--green-btn-color);
}
.slogan-description {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  margin-top: 20px;
}
.slogan-description > span {
  text-align: center;
  color: rgb(111, 104, 104);
}
.under-slogan {
  margin-top: 20px;
  display: block;
  margin: 0 auto;
  width: 1000px;
  margin-top: 50px;
}
footer {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 50px;
}
.line {
  width: 100%;
  height: 1px;
  background-color: gray;
  margin-bottom: 10px;
  opacity: 0.5;
}
footer > span{
  color: gray;
  font-size: 12px;
  /* margin-bottom: 5px; */
}
@media (max-width: 620px) {
  .slogan {
    margin-left: 15px;
    margin-right: 15px;
  }
  .slogan-description {
    margin-left: 15px;
    margin-right: 15px;
  }
}
</style>