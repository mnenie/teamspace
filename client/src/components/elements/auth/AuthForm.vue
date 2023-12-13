<script setup lang="ts">
import InputFormAuth from '@/components/UI/InputFormAuth.vue';
import { AUTH_ROUTE, REGISTRATION_ROUTE, HOME_ROUTE } from '../../../utils/consts';
import { useRoute, useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import ButtonAuth from '@/components/UI/ButtonAuth.vue';
import { useUser } from '@/store/user';
import type { IUser } from '@/types/User';
import * as yup from 'yup';
import { useForm } from 'vee-validate';

const {
  defineInputBinds: defineLoginInputBinds, errors: logErrs, validate: validateLogin } = useForm({
    validationSchema: yup.object({
      email: yup.string().email('*Некорректный адрес email').required('*Обязательное поле'),
      password: yup.string().min(8, '*Пароль должен содержать не менее 8 символов').required('*Обязательное поле'),
    }),
  });
const email = defineLoginInputBinds('email');
const password = defineLoginInputBinds('password');

const {
  defineInputBinds: defineRegistrationInputBinds, errors: regErrs, validate: validateRegistration, } = useForm({
    validationSchema: yup.object({
      emailRegVal: yup.string().email('*Некорректный адрес email').required('*Обязательное поле'),
      passwordRegVal: yup.string().min(8, '*Пароль должен сожержать не менее 8 символов').required('*Обязательное поле'),
      nameVal: yup.string().required('*Обязательное поле'),
      lastNameVal: yup.string().required('*Обязательное поле'),
    }),
  });
const emailRegVal = defineRegistrationInputBinds('emailRegVal');
const passwordRegVal = defineRegistrationInputBinds('passwordRegVal');
const nameVal = defineRegistrationInputBinds('nameVal');
const lastNameVal = defineRegistrationInputBinds('lastNameVal');


const route = useRoute();

const text = computed(() => {
  return route.path === AUTH_ROUTE ? 'Вход' : 'Регистрация';
});

const emailAuth = ref('')
const emailReg = ref('')
const passwordReg = ref('')
const passwordAuth = ref('')
const name = ref('')
const lastname = ref('')

const user = useUser()
const router = useRouter()

const onRegistration = async () => {
  await validateRegistration();
  const registr: IUser = {
    email: emailReg.value,
    password: passwordReg.value,
    username: name.value + ' ' + lastname.value
  }
  if (Object.keys(regErrs.value).length === 0) {
    await user.userRegistration(registr)
    router.push(HOME_ROUTE)
    emailReg.value = ''
    passwordReg.value = ''
    name.value = ''
    lastname.value = ''
  }
}

const onAuth = async () => {
  await validateLogin();
  const auth = {
    email: emailAuth.value,
    password: passwordAuth.value,
  }
  if (Object.keys(logErrs.value).length === 0) {
    await user.userLogin(auth)
    router.push(HOME_ROUTE)
    emailAuth.value = ''
    passwordAuth.value = ''
  }
}

</script>

<template>
  <div class="form_auth">
    <h2 class="title">{{ text }}</h2>
    <div v-if="$route.path === AUTH_ROUTE" class="form_inputs_auth">
      <InputFormAuth v-bind="email" v-model="emailAuth" :plholder="'Введите email'" :type="'text'" />
      <p v-if="logErrs.email" style="margin-top: -5px; margin-bottom: 10px;" class="modal__error">{{ logErrs.email }}</p>
      <InputFormAuth v-bind="password" v-model="passwordAuth" :plholder="'Введите пароль'" :type="'password'" />
      <p v-if="logErrs.password" style="margin-top: -5px; margin-bottom: 10px;" class="modal__error">{{ logErrs.password
      }}
      </p>
    </div>
    <div v-if="$route.path === REGISTRATION_ROUTE" class="form_inputs_reg">
      <InputFormAuth v-model="emailReg" v-bind="emailRegVal" :plholder="'Введите email'" :type="'text'" />
      <p v-if="regErrs.emailRegVal" style="margin-top: -5px; margin-bottom: 10px;" class="modal__error">{{
        regErrs.emailRegVal }}</p>
      <InputFormAuth v-model="name" v-bind="nameVal" :plholder="'Введите имя'" :type="'text'" />
      <p v-if="regErrs.nameVal" style="margin-top: -5px; margin-bottom: 10px;" class="modal__error">{{
        regErrs.nameVal }}</p>
      <InputFormAuth v-model="lastname" v-bind="lastNameVal" :plholder="'Введите фамилию'" :type="'text'" />
      <p v-if="regErrs.lastNameVal" style="margin-top: -5px; margin-bottom: 10px;" class="modal__error">{{
        regErrs.lastNameVal }}
      </p>
      <InputFormAuth v-model="passwordReg" v-bind="passwordRegVal" :plholder="'Введите пароль'" :type="'password'" />
      <p v-if="regErrs.passwordRegVal" style="margin-top: -5px; margin-bottom: 10px;" class="modal__error">{{
        regErrs.passwordRegVal }}</p>
    </div>
    <ButtonAuth v-if="route.path === AUTH_ROUTE" @click="onAuth" style="margin-top: 20px;">Войти</ButtonAuth>
    <ButtonAuth v-if="route.path === REGISTRATION_ROUTE" @click="onRegistration" style="margin-top: 20px;">
      Зарегистрироваться</ButtonAuth>
  </div>
</template>

<style scoped>
.form_auth {
  display: flex;
  flex-direction: column;
  width: 70%;
  padding: 20px;
  background-color: #f4f4f6;
  border-radius: 16px;
}

.title {
  margin-bottom: 20px;
  color: var(--text-color);
}
</style>