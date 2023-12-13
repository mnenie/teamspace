<script setup lang="ts">
import Navbar from './components/layout/Navbar.vue';
import Header from './components/layout/Header.vue';
import AdaptiveError from './pages/AdaptiveError.vue'
import { useMediaQuery } from '@vueuse/core'
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
const route = useRoute()

const adaptiveError = useMediaQuery('(max-width: 850px)');
const shouldShowSpecial = [route.name === 'auth' || route.name === 'registration'];
</script>

<template>
  <div>
    <div v-if="!adaptiveError">
      <router-view />
      <router-view name="special" v-if="shouldShowSpecial" />
      <router-view v-else>
      </router-view>
    </div>
    <AdaptiveError v-else />
  </div>
</template>

<style scoped></style>
