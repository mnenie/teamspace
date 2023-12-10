<script setup lang="ts">
import { ref } from 'vue';
import { VueFinalModal } from 'vue-final-modal'
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import Input from '@/components/UI/Input.vue'

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
}>()

const props = defineProps<{
  modelValue: string
}>()

const { defineInputBinds, errors, validate } = useForm({
  validationSchema: yup.object({
    title: yup.string()
      .required('*Обязательное поле')
  }),
});
const onSubmit = async () => {
  await validate();
  if (Object.keys(errors.value).length === 0) {
    emit('confirm');
  }
};
const title = defineInputBinds('title');
const btnTitle = ref('Создать')
</script>

<template>
  <VueFinalModal class="modal_vue" content-class="modal_final" :content-transition="'vfm-fade'">
    <div class="text_content">
      <h2 class="size_3">Введите название проекта</h2>
      <Input :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" :placeholder="'Введите название проекта'" v-bind="title" />
      <span>{{ errors.title }}</span>
      <button @click="onSubmit">{{ btnTitle }}</button>
    </div>
    <img @click="emit('close')" class="close" src="/icons/close.svg" alt="">
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

.text_content {
  display: flex;
  flex-direction: column;
  width: 400px;
}

h2 {
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
  max-width: 355px;
  color: var(--black-color);
  margin-bottom: 16px;
}

p {
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: var(--black-color);
  max-width: 311px;
  margin-bottom: 35px;
}
</style>