<script setup lang="ts">
import ButtonModalWIcon from '@/components/UI/ButtonModalWIcon.vue';
import ModalProject from '@/components/UI/ModalProject.vue';
import { UserCircleIcon } from '@heroicons/vue/24/outline'
// import { useProject } from '../../../store/project';
import { useModal, ModalsContainer } from 'vue-final-modal'
import { useUser } from '../../../store/user';
import { onMounted, ref } from 'vue';
const { open, close } = useModal({
  component: ModalProject,
  attrs: {
    onConfirm() {
      close()
    },
    onClose() {
      close()
    }
  }
})
const user = useUser()
if (localStorage.getItem('token')) {
  user.isAuth = true
  user.user = JSON.parse(localStorage.getItem('user') as string)
}
const dropdown = ref<boolean>(false)
</script>

<template>
  <div class="header_items">
    <div class="icon">
      <span style="margin-right: 10px">TeamSpace</span>
      <ButtonModalWIcon @click="open">
        <i class="pi pi-plus"></i>
        <span class="create-btn-text">Создать проект</span>
      </ButtonModalWIcon>
    </div>
    <div class="right">
      <div class="user_info" @click="dropdown = !dropdown">
        <!-- <UserCircleIcon style="width: 20px; height: 20px;" /> -->
        <span class="nickname">{{ user.user.username }}</span>
        <i class="pi pi-angle-down"></i>
      </div>
      <div class="dropdown" v-if="dropdown">
        <div class="item">
          <i class="pi pi-sign-out"></i>
          <span>Выйти</span>
        </div>
      </div>
    </div>
    <ModalsContainer />
  </div>
</template>

<style scoped>
.dropdown {
  padding: 5px;
  top: 55px;
  right: 10px;
  z-index: 998;
  width: 110px;
  position: absolute;
  background-color: white;
  box-shadow: 0 4px 13px #3030301a;
  border-radius: 7px;
}
.item {
    display: flex;
    align-items: center;
    max-width: 100px;
    width: 100%;
    height: 30px;
    margin: 0 auto;
    padding: 5px;
    cursor: pointer;
    border-radius: 5px;
}

.item:hover {
    background-color: var(--gray-color);
}

.item>.pi {
    font-size: 14px;
    margin-right: 10px;
    margin-left: 5px;
    color: rgb(255, 84, 84);
}

.item>span {
    font-size: 13px;
    color: rgb(255, 84, 84);
}
.nickname {
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  color: var(--text-color);
}

.header_items {
  padding: 15px 10px;
  border-bottom: 1.3px solid var(--gray-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pi-plus {
  font-size: 11px;
  color: var(--white-color);
  /* color: white; */
  margin-left: 7px;
}

.create-btn-text {
  font-size: 13px;
  font-weight: 500;
  margin-right: 5px;
  color: var(--white-color);
  /* color: rgb(255, 255, 255); */
}

.icon {
  display: flex;
  align-items: center;
  gap: 10px;


}

.icon>span {
  color: var(--text-color);
  font-size: 30px;
}

.icon>img {
  width: 20px;
  height: 20px;
}

.right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user_info {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  width: auto;
  height: 40px;
  background: var(--white-color);
  cursor: pointer;
  border-radius: 8px;
}
.user_info:hover {
  background: var(--gray-color);
}
.user_info > .pi {
  margin-left: 5px;
}
</style>