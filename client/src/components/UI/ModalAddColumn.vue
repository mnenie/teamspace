<script setup lang="ts">
import { ref } from 'vue';
import { VueFinalModal } from 'vue-final-modal'
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import Input from '@/components/UI/Input.vue'
import type { IColumn } from '@/types/Column';
import { useBoard } from '@/store/board';
import ButtonModal from './ButtonModal.vue';

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
const value = ref<string>('')
const board = useBoard()
const onSubmit = async () => {
  await validate();
  if (Object.keys(errors.value).length === 0) {
    const columnInfo: IColumn = {
      name: value.value,
      place: 1,
      boardId: board.boardInfo.id!
    };
    await board.addColumn(columnInfo)
    emit('confirm');
  }
};

const title = defineInputBinds('title');
const btnTitle = ref('Добавить')
</script>

<template>
  <VueFinalModal class="modal_vue" content-class="modal_final" :content-transition="'vfm-fade'">
    <div class="modal__content">
      <div class="modal__header">
        <h2 class="modal__h2">Введите название колонки</h2>
        <i @click="emit('close')" class="pi pi-times modal__close"></i>
      </div>
      <div class="modal__body">
        <Input v-model="value" :placeholder="'Введите название колонки'" v-bind="title" :readonly="false"/>
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


<style scoped></style>