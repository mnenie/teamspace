<script setup lang="ts">
import { ref } from 'vue';
import { VueFinalModal } from 'vue-final-modal'
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import Input from '@/components/UI/Input.vue'
import ButtonModal from '@/components/UI/ButtonModal.vue'
import type { ISheet } from '@/types/Sheet';
import { useDoc } from '@/store/docs';
import { useProject } from '@/store/project';

const props = defineProps<{elems :ISheet[]}>();
const documentation = useDoc();
const project = useProject();

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
const onSubmit = async () => {
  await validate();
  if (Object.keys(errors.value).length === 0) {
    emit('confirm');
    const newSheet : ISheet = {
    name : value.value ,
    projectId : project.project.id!,
    body : "",
  }
  await documentation.addSheet(newSheet);
  }
};
const title = defineInputBinds('title');
const btnTitle = ref('Добавить')
const value = ref<string>('')
</script>

<template>
  <VueFinalModal class="modal_vue" content-class="modal_final" :content-transition="'vfm-fade'">
    <div class="modal__content">
      <div class="modal__header">
        <h2 class="modal__h2">Введите название документации</h2>
        <i @click="emit('close')" class="pi pi-times modal__close"></i>
      </div>
      <div class="modal__body">
        <Input v-model="value" :placeholder="'Введите название для новой документации'" v-bind="title" :readonly="false"/>
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