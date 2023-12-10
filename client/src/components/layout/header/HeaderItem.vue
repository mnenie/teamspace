<script setup lang="ts">
import ButtonModalWIcon from '@/components/UI/ButtonModalWIcon.vue';
import ModalProject from '@/components/UI/ModalProject.vue';
import { UserCircleIcon } from '@heroicons/vue/24/outline'
// import { useProject } from '../../../store/project';
import {useModal, ModalsContainer} from 'vue-final-modal'
const {open, close} = useModal({
  component: ModalProject,
  attrs:{
    onConfirm() {
      close()
    },
    onClose(){
      close()
    }
  }
})
</script>

<template>
  <div class="header_items">
    <div class="icon">
      <span style="margin-right: 10px">TeamSpace</span>
      <ButtonModalWIcon>
        <i class="pi pi-plus"></i>
        <span class="create-btn-text">Создать проект</span>
      </ButtonModalWIcon>
    </div>
    <div class="right">
      <div class="user_info">
        <UserCircleIcon style="width: 20px; height: 20px;" />
        <span class="nickname">Тамара Константиновна</span>
      </div>
      <!-- <span style="color: var(--text-color);">Выйти</span> -->
    </div>
    <ModalsContainer />
  </div>
</template>

<style scoped>
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
  color: var(--text-color);
  /* color: white; */
  margin-left: 7px;
}
.create-btn-text {
  font-size: 13px;
  font-weight: 500;
  margin-right: 5px;
  color: var(--text-color);
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
.right{
  display: flex;
  align-items: center;
  gap: 15px;
}
.user_info {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}
</style>