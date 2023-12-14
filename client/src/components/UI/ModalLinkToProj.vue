<script setup lang="ts">
import { ref } from 'vue';
import { VueFinalModal } from 'vue-final-modal'
import Input from '@/components/UI/Input.vue'
import ButtonModal from './ButtonModal.vue';
import $api from '@/api';

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
}>()

const link = ref('')
const onSubmit = async () => {
  const resp = $api.get(link.value + `&token=${localStorage.getItem('token')}`);
  emit('confirm');
}

const btnTitle = ref('Войти')

</script>

<template>
  <VueFinalModal class="modal_vue" content-class="modal_final" :content-transition="'vfm-fade'">
    <div class="modal__content">
      <div class="modal__header">
        <h2 class="modal__h2">Введите ссылку для входа</h2>
        <i @click="emit('close')" class="pi pi-times modal__close"></i>
      </div>
      <div class="modal__body">
        <Input v-model="link" :placeholder="'Введите ссылку, затем обновите страницу'" :readonly="false" />
      </div>
      <div class="modal__footer">
        <ButtonModal @click="onSubmit">
          <span class="modal__btn-content">{{ btnTitle }}</span>
        </ButtonModal>
      </div>
    </div>
  </VueFinalModal>
</template>

<style scoped>
.close {
  position: absolute;
  right: 14px;
  top: 14px;
  z-index: 101;
  cursor: pointer;
}
</style>