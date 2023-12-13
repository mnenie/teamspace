<script setup lang="ts">
import Navbar from '@/components/layout/Navbar.vue';
import Header from '@/components/layout/Header.vue';
import { useUser } from '@/store/user';
const user = useUser()
if (localStorage.getItem('token')) {
  user.isAuth = true
  user.user = JSON.parse(localStorage.getItem('user') as string)
}
</script>

<template>
  <div class="content">
    <div>
      <Navbar />
    </div>

    <div class="main">
      <Header />
      <main>
        <div class="header-setting">
          <h3>Участники</h3>
          <button>Добавить участников</button>
        </div>
        <div class="members">
          <div class="member">
            <div class="member-left">
              <div class="circle">
                  <span>{{ user.user && user.user.username ? user.user.username.split(' ').map(word => word.charAt(0)).join('') : '' }}</span>
              </div>
              <div class="text">
                <span class="name">{{ user.user && user.user.username ? user.user.username : '' }}</span>
                <span class="role">Супер-админ</span>
              </div>
            </div>
            <span class="points">Количество поинтов: <span>1500</span></span>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
main {
  margin-top: 10px;
  padding-left: 15px;
  padding-right: 15px;
}
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

.content {
  display: flex;
  width: 100%;
  overflow: hidden;
}

.main {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
}
</style>