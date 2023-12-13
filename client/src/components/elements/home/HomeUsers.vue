<script setup lang="ts">
import { useUser } from '@/store/user';
import ProjectLink from '@/components/UI/ProjectLink.vue';
import { ModalsContainer, useModal } from 'vue-final-modal'


const user = useUser()
if (localStorage.getItem('token')) {
  user.isAuth = true
  user.user = JSON.parse(localStorage.getItem('user') as string)
}

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
  <div class="header-setting">
    <h3>Участники</h3>
    <button @click="open()">Добавить участников</button>
  </div>
  <div class="members">
    <div class="member">
      <div class="member-left">
        <div class="circle">
          <span>{{ user.user && user.user.username ? user.user.username.split(' ').map(word => word.charAt(0)).join('') :
            '' }}</span>
        </div>
        <div class="text">
          <span class="name">{{ user.user && user.user.username ? user.user.username : '' }}</span>
          <span class="role">Супер-админ</span>
        </div>
      </div>
      <span class="points">Количество поинтов: <span>1500</span></span>
    </div>
  </div>
</template>

<style scoped>
.header-setting {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-setting > h3{
  color: var(--text-color);
  font-size: 25px;
}
.header-setting > button{
  background: rgb(229, 229, 229);
  border: none;
  cursor: pointer;
  border-radius: 5px;
  padding: 5px 10px;
  color: var(--text-color);
  margin-right: 30px;
} 
.header-setting > button:hover{
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
.points > span{
  color: #359f39;
}

</style>