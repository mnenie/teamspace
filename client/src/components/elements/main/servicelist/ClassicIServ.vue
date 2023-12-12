<script setup lang="ts">

</script>

<template>
    <div class="projects container" id="projects">
      <div class="projects-right" v-animateonscroll="{ enterClass: 'fadeinright', leaveClass: 'fadeoutright'}">
        <img src="../../../../../public/img/project.png" alt="">
      </div>
      <div class="projects-left" v-animateonscroll="{ enterClass: 'fadeinleft', leaveClass: 'fadeoutleft' }">
        <span>Создавай</span>
        <span>Авторизованный пользователь может создавать проекты для своих команд. Количество неограничено.</span>
      </div>
    </div>
</template>

<style scoped>
.projects {
  display: flex;
  justify-content: space-between;
  margin-top: 110px;
}
.projects-left {
  width: 960px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: all 1s ease-in-out;
}

.projects-left > span:nth-child(1) {
  font-size: 50px;
  color: var(--text-color);
}
.projects-left > span:nth-child(2) {
  margin-top: 40px;
  text-align: center;
  color: rgb(111, 104, 104);
}
.projects-right {
  display: flex;
  justify-content: center; /* Горизонтальное выравнивание по центру */
  align-items: center;
  border-radius: 10px;
  border: 10px solid var(--green-btn-color);
  transition: all 1s ease-in-out;
}
.projects-right > img{
  width: 1050px;
}
</style>