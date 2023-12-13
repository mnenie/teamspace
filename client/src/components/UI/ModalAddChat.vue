<script setup lang="ts">
import { ref } from 'vue';
import { VueFinalModal } from 'vue-final-modal'
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import Input from '@/components/UI/Input.vue'
import ButtonModal from '@/components/UI/ButtonModal.vue'
import { useChat } from '@/store/chats';
import { useProject } from '@/store/project';

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
}>()

const { defineInputBinds, errors, validate } = useForm({
  validationSchema: yup.object({
    title: yup.string()
      .required('* Обязательное поле')
  }),
});

const chats = useChat();
const project = useProject();

const onSubmit = async () => {
  await validate();
  if (Object.keys(errors.value).length === 0) {
    emit('confirm');
    const newRoom = {name : value.value + '', projectId : project.project.id!}
    await chats.addChat(newRoom);
}
  };


const title = defineInputBinds('title');
const btnTitle = ref('Добавить')
const value = ref<string | number>('')
</script>

<template>
  <VueFinalModal class="modal_vue" content-class="modal_final" :content-transition="'vfm-fade'">
    <div class="modal__content">
      <div class="modal__header">
        <h2 class="modal__h2">Введите название чата</h2>
        <i @click="emit('close')" class="pi pi-times modal__close"></i>
      </div>
      <div class="modal__body">
        <Input v-model="value" :placeholder="'Введите название для нового чата'" v-bind="title" :readonly="false"/>
        <span class="modal__error">{{ errors.title }}</span>
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
</style>