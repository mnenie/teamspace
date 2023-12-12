<script setup lang="ts">
import { ref } from 'vue';

interface page {
  title:string
  description:string
  src:string
  inverted:boolean
}

const pages = ref<Array<page>>([
    {title: 'Создавай', description: 'Авторизованный пользователь может создавать проекты для своих команд. Количество неограничено.', src: '/img/project.png', inverted: false},
    {title: 'Добавляй', description: 'В каждом проекте пользователь может создавать свои доски с задачами и отмечать их как выполненные. Количество неограничено.', src: '/img/board.png', inverted: true},
    {title: 'Записывай', description: 'В каждом проекте пользователь может создавать свои документации и работать с ними. Количество неограничено.', src: '/img/sheet.png', inverted: false},
    {title: 'Общайся', description: 'В каждом проекте пользователь может создавать свои чаты и общаться с другими. Количество неограничено.', src: '/img/chat.jpg', inverted: true},
])
</script>

<template>
  <div v-for="page in pages" class="projects container" id="projects">
    <div v-if="page.inverted" class="projects-right" v-animateonscroll="{ enterClass: 'fadeinright', leaveClass: 'fadeoutright' }">
      <img :src="page.src" alt="">
    </div>
    <div class="projects-left" v-animateonscroll="{ enterClass: 'fadeinleft', leaveClass: 'fadeoutleft' }">
      <span>{{ page.title }}<span class="dot">.</span></span>
      <span>{{ page.description }}</span>
    </div>
    <div v-if="!page.inverted" class="projects-right" v-animateonscroll="{ enterClass: 'fadeinright', leaveClass: 'fadeoutright' }">
      <img :src="page.src" alt="">
    </div>
  </div>
</template>



<style scoped>
.dot {
    color: var(--green-btn-color)
}
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
  display: inline-block;
  width: 350px;
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
  width: 1000px;
}
</style>