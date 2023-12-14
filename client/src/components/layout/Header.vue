<script setup lang="ts">
import ModalLinkToProj from '../UI/ModalLinkToProj.vue';
import HeadPartHome from '../elements/home/HeadPartHome.vue';
import HeaderItem from './header/HeaderItem.vue';
import { useModal } from 'vue-final-modal';

const {open, close} = useModal({
  component: ModalLinkToProj,
  attrs: {
    onClose(){
      close()
    },
    onConfirm(){
      close()
    }
  }
})
</script>

<template>
  <div class="header">
    <HeaderItem @open-modal-link="open" />
    <HeadPartHome />
  </div>
</template>

<style scoped>
.header{
  display: flex;
  flex-direction: column;
}
</style>