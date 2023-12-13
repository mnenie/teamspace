<script setup lang="ts">
import { ref } from 'vue';
import { VueFinalModal } from 'vue-final-modal'
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import Input from '@/components/UI/Input.vue'
import { useProject } from '@/store/project';
import type { IProject } from '@/types/Project';
import ButtonModal from './ButtonModal.vue';

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
}>()

const nameProject = ref('')
const project = useProject()
const { defineInputBinds, errors, validate } = useForm({
  validationSchema: yup.object({
    title: yup.string()
      .required('*Обязательное поле')
  }),
});
const user = JSON.parse(localStorage.getItem('user') as string)
const onSubmit = async () => {
  await validate();
  if (Object.keys(errors.value).length === 0) {
    const projectData: IProject = {
      ownerId: user.id,
      name: nameProject.value,
    };
    project.addProject(projectData);
    emit('confirm');
  }
};
const title = defineInputBinds('title');
const btnTitle = ref('Создать')

</script>

<template>
  <VueFinalModal class="modal_vue" content-class="modal_final" :content-transition="'vfm-fade'">
    <div class="modal__content">
      <div class="modal__header">
        <h2 class="modal__h2">Введите название проекта</h2>
        <i @click="emit('close')" class="pi pi-times modal__close"></i>
      </div>
      <div class="modal__body">
        <Input v-model="nameProject" :placeholder="'Введите название проекта'" v-bind="title" :readonly="false"/>
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



<!-- никсон стили нужны -->

<style scoped>

.close {
  position: absolute;
  right: 14px;
  top: 14px;
  z-index: 101;
  cursor: pointer;
}
</style>