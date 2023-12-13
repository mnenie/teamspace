<script setup lang="ts">
import InputFormAuth from '@/components/UI/InputFormAuth.vue';
import { AUTH_ROUTE, REGISTRATION_ROUTE, HOME_ROUTE } from '../../../utils/consts';
import { useRoute, useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import ButtonAuth from '@/components/UI/ButtonAuth.vue';
import { useUser } from '@/store/user';
import type { IUser } from '@/types/User';
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
  const registr : IUser = {
    email: emailReg.value,
    password: passwordReg.value,
    username: name.value + ' ' + lastname.value
  }
  await user.userRegistration(registr)
  router.push(HOME_ROUTE)
  emailReg.value = ''
  passwordReg.value = ''
  name.value = ''
  lastname.value = ''
}

const onAuth = async () => {
  const auth = {
    email: emailAuth.value,
    password: passwordAuth.value,
  }
  await user.userLogin(auth)
  router.push(HOME_ROUTE)
  emailAuth.value = ''
  passwordAuth.value = ''
}


</script>

<template>
  <div class="form_auth">
    <h2 class="title">{{ text }}</h2>
    <div v-if="$route.path === AUTH_ROUTE" class="form_inputs_auth">
      <InputFormAuth v-model="emailAuth" :plholder="'Введите email'" :type="'text'" />
      <InputFormAuth v-model="passwordAuth" :plholder="'Введите пароль'" :type="'password'" />
    </div>
    <div v-if="$route.path === REGISTRATION_ROUTE" class="form_inputs_reg">
      <InputFormAuth v-model="emailReg" :plholder="'Введите email'" :type="'text'"/>
      <InputFormAuth v-model="name" :plholder="'Введите имя'" :type="'text'"/>
      <InputFormAuth v-model="lastname" :plholder="'Введите фамилию'" :type="'text'"/>
      <InputFormAuth v-model="passwordReg" :plholder="'Введите пароль'" :type="'password'"/>
    </div>
    <ButtonAuth @click="onAuth" style="margin-top: 20px;">Войти</ButtonAuth>
    <ButtonAuth @click="onRegistration" style="margin-top: 20px;">Зарегистрироваться</ButtonAuth>
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