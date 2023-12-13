<script setup lang="ts">
import Navbar from './components/layout/Navbar.vue';
import Header from './components/layout/Header.vue';
import AdaptiveError from './pages/AdaptiveError.vue'
import { AUTH_ROUTE, MAIN_PAGE, NOTFOUND_ROUTE, REGISTRATION_ROUTE, HOME_ROUTE } from './utils/consts';
import { useMediaQuery } from '@vueuse/core'
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
const route = useRoute()

const adaptiveError = useMediaQuery('(max-width: 850px)');
const shouldShowSpecial = [route.name === 'auth' || route.name === 'registration'];
</script>

<template>
  <div>
    <router-view />
    <router-view name="special" v-if="shouldShowSpecial" />
    <router-view v-else >
    </router-view>
  </div>
</template>

<style scoped>
</style>
