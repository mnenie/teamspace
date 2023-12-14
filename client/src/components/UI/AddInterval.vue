<script setup lang="ts">
import { ref } from 'vue';
import { VueFinalModal } from 'vue-final-modal'
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import Input from '@/components/UI/Input.vue'
import ButtonModal from '@/components/UI/ButtonModal.vue'
import { useChat } from '@/store/chats';
import { useProject } from '@/store/project';
import Calendar from 'primevue/calendar';

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
//   if (Object.keys(errors.value).length === 0) {
//     emit('confirm');
//     const newRoom = {name : value.value + '', projectId : project.project.id!}
//     await chats.addChat(newRoom);
//     }
  };


const title = defineInputBinds('title');
const btnTitle = ref('Добавить')
const iTitle = ref<string | number>('')
const iDate = ref<string>('')
const iBody = ref<string | number>('')
</script>

<template>
  <VueFinalModal class="modal_vue" content-class="modal_final" :content-transition="'vfm-fade'">
    <div class="modal__content">
      <div class="modal__header">
        <h2 class="modal__h2">Введите параметры</h2>
        <i @click="emit('close')" class="pi pi-times modal__close"></i>
      </div>
      <div class="modal__body">
        <Input v-model="iTitle" :placeholder="'Введите название цели'" v-bind="title" :readonly="false"/>
        <span class="modal__error">{{ errors.title }}</span>
        <Input v-model="iBody" :placeholder="'Введите описание цели'" v-bind="title" :readonly="false"/>
        <span class="modal__error">{{ errors.title }}</span>
        <label class="date">Введите дату цели:</label>
        <Calendar v-model="iDate" showIcon iconDisplay="input" class="calendar" />
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
.date {
    margin-bottom: 10px;
}
.p-float-label > label{
    font-size: 12px;
}
.calendar {
    height: 50px;
    width: 100%;
}
.input_form {
    margin: 0;
    height: 50px;
    width: 100%;
    padding: 10px 0 10px 35px;
    font-family: sans-serif;
    color: #4a5568;
    background-color: #ffffff;
    border-width: 1px;
    border-color: black;
    transition-property: color;
    transition-duration: 200ms;
    appearance: none;
    border-radius: 8px;
}

.input_form:hover {
    border-color: #9ba1aa;
}
</style>