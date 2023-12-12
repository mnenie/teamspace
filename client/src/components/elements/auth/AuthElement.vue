<script setup lang="ts">
import { REGISTRATION_ROUTE } from '@/utils/consts';
import AuthLeftPart from './AuthLeftPart.vue';
import AuthRightPart from './AuthRightPart.vue';
</script>

<template>
  <div :class="{'content_auth': true, 'reg': $route.path === REGISTRATION_ROUTE}">
    <AuthLeftPart />
    <AuthRightPart />
  </div>
</template>

<style scoped>
.content_auth{
  display: flex;
}

.reg{
  flex-direction: row-reverse;
}
</style>