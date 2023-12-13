<script setup lang="ts">
import { AUTH_ROUTE, REGISTRATION_ROUTE } from '@/utils/consts';
import AuthForm from './AuthForm.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
const route = useRoute();

const titleLink = computed(() => {
  return route.path === AUTH_ROUTE ? 'Зарегистрируйтесь' : 'Войдите';
});
const text = computed(() => {
  return route.path === AUTH_ROUTE ? 'У вас ещё нет аккаунта?' : 'У вас уже есть аккаунт?';
});
const style = computed(()  => {
  return route.path === AUTH_ROUTE ? 'margin-top: -42px;' : 'margin-bottom: -42px';
})
</script>

<template>
  <div :style="style" class="left_part">
    <img class="img" src="/img/logo.png" alt="">
    <AuthForm />
    <span class="span_no">{{ text }}</span>
    <router-link class="route" :to="route.path === REGISTRATION_ROUTE ? AUTH_ROUTE : REGISTRATION_ROUTE">
      {{ titleLink }}
    </router-link>
  </div>
</template>

<style scoped>
.left_part {
  background-color: var(--white-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  position: relative;
}
.span_no{
  margin-top: 20px;
  color: var(--text-color);
  margin-bottom: 5px;
}
.img{
  width: 300px;
  height: 200px;
}
.route{
  text-decoration: none;
  color: var(--green-btn-color);
}
@media (max-width: 1200px) {
  .left_part{
    height: 750px;
  }
}
</style>