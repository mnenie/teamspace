<script setup lang="ts">
import { useUser } from '@/store/user';
import ProjectLink from '@/components/UI/ProjectLink.vue';
import { ModalsContainer, useModal } from 'vue-final-modal'
import { useProject } from '@/store/project';
import { onMounted } from 'vue';
import { FaceSmileIcon } from '@heroicons/vue/24/outline';

const user = useUser()
const project = useProject()
if (localStorage.getItem('token')) {
  user.isAuth = true
  user.user = JSON.parse(localStorage.getItem('user') as string)
}
const token = localStorage.getItem('token')
const select = localStorage.getItem('selectedProject')

onMounted(async () => {
  await project.getMembers(project.project.id!)
})

const { open, close } = useModal({
  component: ProjectLink,
  attrs: {
    onClose() {
      close()
    }
  }
})
</script>

<template>
  <div v-if="select && token">
    <div class="header-setting">
      <h3>Участники</h3>
      <button @click="open()">Добавить участников</button>
    </div>
    <div class="members" v-for="memz in project.members" :key="memz.id">
      <div class="member">
        <div class="member-left">
          <div class="circle">
            <span>{{ memz.User && memz.User.username ? memz.User.username.split(' ').map(word => word.charAt(0)).join('')
              :
              '' }}</span>
          </div>
          <div class="text">
            <span class="name">{{ memz.User && memz.User.username ? memz.User.username : '' }}</span>
            <span class="role">{{ memz.role }}</span>
          </div>
        </div>
        <span class="points">Количество поинтов: <span>{{ memz.points }}</span></span>
      </div>
    </div>
  </div>
  <div v-else style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 10%;"
    class="error_proj">
    <FaceSmileIcon style="width: 20px; height: 20px; color: #EE685F;" />
    <span style="color: #EE685F;">Создайте или выберите проект чтобы начать работу в TeamSpace</span>
  </div>
</template>

<style scoped>
.header-setting {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-setting>h3 {
  color: var(--text-color);
  font-size: 25px;
}

.header-setting>button {
  background: rgb(229, 229, 229);
  border: none;
  cursor: pointer;
  border-radius: 5px;
  padding: 5px 10px;
  color: var(--text-color);
  margin-right: 30px;
}

.header-setting>button:hover {
  opacity: 0.7;
}

.members {
  display: flex;
  flex-direction: column;
}

.member {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.member-left {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--green-color);
  margin-right: 10px;
  cursor: pointer;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

.circle>span {
  color: var(--white-color);
  font-size: 20px;
}

.text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.name {
  margin-bottom: 5px;
}

.role {
  color: var(--text-color);
  font-size: 13px;
}

.points {
  margin-right: 30px;
}

.points>span {
  color: #359f39;
}

.error_proj {
  position: relative;
  height: 100%;
}

/* .error_proj::after {
  content: '';
  position: fixed;
  background: linear-gradient(45deg, #9faba3, #ced7ce 50%, #2aab55);
  bottom: -30vh;
  left: 0;
  width: 100%;
  filter: blur(20vh);
  height: 40vh;
} */
</style>