<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { VueFinalModal } from 'vue-final-modal'
import Input from '@/components/UI/Input.vue'
import ButtonModal from '@/components/UI/ButtonModal.vue'
import Message from 'primevue/message';
import * as yup from 'yup'
import { useForm } from 'vee-validate';
import { useProject } from '@/store/project';
import $api, { API } from '@/api';
const emit = defineEmits<{
  (e: 'close'): void
}>()

export interface IInvitation{
    id : number,
    isActive : boolean,
    projectId : number,
}

const showsuccess = ref<boolean>(false);
const btnTitle = ref('Скопировать')
const role = ref<string>('')
const linkid = ref();
const project = useProject();
const link = computed(() => {
  return `${API}/invitation?role=${role.value}&id=${linkid.value}`
})
console.log(123);
const { defineInputBinds, errors, validate } = useForm({
  validationSchema: yup.object({
    roleVal: yup.string()
      .required('*Обязательное поле')
  }),
});

onMounted(async () => {
  const resp = await $api.post(`/invitation/${project.project.id}`);
  const data : IInvitation = resp.data;
  linkid.value = data.id;
});

const roleVal = defineInputBinds('roleVal')
const copyText = async () => {
  try {
    await validate()
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
        <Input v-model="role" v-bind="roleVal"
          :placeholder="'Введите роль латиницей'" :readonly="false"
          class="role-input" />
        <p v-if="errors.roleVal" style="margin-top: -10px; margin-bottom: 20px;" class="modal__error">{{ errors.roleVal }}
        </p>
        <Input v-model="link" :placeholder="'Скопируйте ссылку'" :readonly="true" />
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