<script setup lang="ts">
import { ref } from 'vue';
import { VueFinalModal } from 'vue-final-modal'
import Input from '@/components/UI/Input.vue'
import ButtonModal from '@/components/UI/ButtonModal.vue'
import Message from 'primevue/message';

const emit = defineEmits<{
  (e: 'close'): void
}>()

const showsuccess = ref<boolean>(false);
const btnTitle = ref('Скопировать')
const role = ref<string | number>('')
const link = ref<string | number>('https://www.google.com/')

const copyText = async () => {
    try {
        await navigator.clipboard.writeText(link.value.toString());
        showsuccess.value = true
        setTimeout(() => {
            showsuccess.value = false
        }, 2000)

    } catch (err) {
        console.error('error:', err);
    }
};
</script>

<template>
  <VueFinalModal class="modal_vue" content-class="modal_final-600" :content-transition="'vfm-fade'">
    <div class="modal__content">
      <div class="modal__header">
        <h2 class="modal__h2">Скопируйте ссылку на приглашение</h2>
        <i @click="emit('close')" class="pi pi-times modal__close"></i>
      </div>
      <div class="modal__body">
        <Input v-model="role" :placeholder="'Напишите роль, которую будет иметь приглашенный пользователь'" :readonly="false" class="role-input"/>
        <Input v-model="link" :placeholder="'Скопируйте ссылку'" :readonly="true"/>
      </div>
      <div class="modal__footer">
        <ButtonModal @click="copyText">
          <span class="modal__btn-content">{{ btnTitle }}</span>
        </ButtonModal>
      </div>
    </div>
    <transition-group name="p-message" tag="div">
        <Message severity="success" class="success" v-if="showsuccess">
            <template #messageicon>
            <span></span>
            </template>
            <span class="ml-2">Успешно скопировано!</span>
        </Message>
    </transition-group>
  </VueFinalModal>
</template>


<style scoped>
.success {
  bottom: 40px;
  left: 40px;
  position: fixed;
}
.role-input {
    margin-bottom: 20px;
}
</style>