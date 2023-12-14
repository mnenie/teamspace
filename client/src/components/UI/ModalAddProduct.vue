<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { VueFinalModal } from 'vue-final-modal'
import Input from '@/components/UI/Input.vue'
import ButtonModal from '@/components/UI/ButtonModal.vue'
import Message from 'primevue/message';
import * as yup from 'yup'
import { useForm } from 'vee-validate';
import { useProject } from '@/store/project';
import { useStore } from '@/store/shop';
import type { IProduct } from '@/types/Product';
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
}>()

const showsuccess = ref<boolean>(false);
const name = ref<string>('')
const count = ref<string>('')
const cost = ref<string>('')

const project = useProject();
const store = useStore();

const { defineInputBinds, errors, validate } = useForm({
  validationSchema: yup.object({
    nameValidate: yup.string()
      .required('*Введите название'),
    costValidate: yup.string()
      .required('*Введите стоимость'),
    countValidate: yup.string()
      .required('*Введите количество'),
  }),
});

const countValidate = defineInputBinds('countValidate')
const costValidate = defineInputBinds('costValidate')
const nameValidate = defineInputBinds('nameValidate')
const copyText = async () => {
  await validate()
  const newProduct: IProduct = {
    projectId: project.project.id!,
    name: name.value,
    cost: parseInt(cost.value),
    count: parseInt(count.value),
  }
  if (Object.keys(errors.value).length === 0) {
    emit('confirm')
    await store.addProduct(newProduct)
  }
};

</script>

<template>
  <VueFinalModal class="modal_vue" content-class="modal_final-600" :content-transition="'vfm-fade'">
    <div class="modal__content">
      <div class="modal__header">
        <h2 class="modal__h2">Добавьте товар или услугу</h2>
        <i @click="emit('close')" class="pi pi-times modal__close"></i>
      </div>
      <div class="modal__body">
        <Input v-model="name" v-bind="nameValidate" :placeholder="'Введите название товара или услуги'" :readonly="false"
          class="role-input" />
        <p v-if="errors.nameValidate" style="margin-top: -10px; margin-bottom: 20px;" class="modal__error">{{
          errors.nameValidate }} </p>
        <Input v-model="cost" v-bind="costValidate" :placeholder="'Введите стоимость товара '" :readonly="false"
          class="role-input" />
        <p v-if="errors.costValidate" style="margin-top: -10px; margin-bottom: 20px;" class="modal__error">{{
          errors.costValidate }} </p>
        <Input v-model="count" v-bind="countValidate" :placeholder="'Введите количество'" :readonly="false"
          class="role-input" />
        <p v-if="errors.countValidate" style="margin-top: -10px; margin-bottom: 20px;" class="modal__error">{{
          errors.countValidate }}
        </p>
      </div>
      <div class="modal__footer">
        <ButtonModal @click="copyText">
          <span class="modal__btn-content">{{ "Добавить" }}</span>
        </ButtonModal>
      </div>
    </div>
    <transition-group name="p-message" tag="div">
      <Message severity="success" class="success" v-if="showsuccess">
        <template #messageicon>
          <span></span>
        </template>
        <span class="ml-2">Успешно добавлено!</span>
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