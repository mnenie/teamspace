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
    <!-- <img class="under-slogan" src="../../public/img/sir.jpg" alt=""> -->
    <MainPageServices />
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
  width: 600px;
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
</style>