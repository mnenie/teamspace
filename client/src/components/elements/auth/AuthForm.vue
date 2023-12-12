<script setup lang="ts">
import InputFormAuth from '@/components/UI/InputFormAuth.vue';
import { AUTH_ROUTE, REGISTRATION_ROUTE } from '../../../utils/consts';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import ButtonAuth from '@/components/UI/ButtonAuth.vue';
const route = useRoute();

const titleBtn = computed(() => {
  return route.path === AUTH_ROUTE ? 'Войти' : 'Зарегистрироваться';
});
const text = computed(() => {
  return route.path === AUTH_ROUTE ? 'Вход' : 'Регистрация';
});
</script>

<template>
  <div class="form_auth">
    <h2 class="title">{{ text }}</h2>
    <div v-if="$route.path === AUTH_ROUTE" class="form_inputs_auth">
      <InputFormAuth :plholder="'Введите email'" />
      <InputFormAuth :plholder="'Введите пароль'" />
    </div>
    <div v-if="$route.path === REGISTRATION_ROUTE" class="form_inputs_reg">
      <InputFormAuth :plholder="'Введите email'" />
      <InputFormAuth :plholder="'Введите никнейм'" />
      <InputFormAuth :plholder="'Введите пароль'" />
    </div>
    <ButtonAuth @click="$router.push('/')" style="margin-top: 20px;">{{ titleBtn }}</ButtonAuth>
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