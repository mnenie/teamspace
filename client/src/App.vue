<script setup lang="ts">
import Navbar from './components/layout/Navbar.vue';
import Header from './components/layout/Header.vue';
import AdaptiveError from './pages/AdaptiveError.vue'
import { AUTH_ROUTE, MAIN_PAGE, NOTFOUND_ROUTE, REGISTRATION_ROUTE } from './utils/consts';
import { useMediaQuery } from '@vueuse/core'
import { useRoute } from 'vue-router';
const route = useRoute()

const adaptiveError = useMediaQuery('(max-width: 850px)');
const additionalView = [route.path === MAIN_PAGE, route.path === AUTH_ROUTE, route.path === REGISTRATION_ROUTE, route.path === NOTFOUND_ROUTE];
</script>

<template>
  <div>
    <router-view v-if="additionalView" name="additionalView">
    </router-view>
    
    <div v-else-if="!adaptiveError" class="content">
      <div>
        <Navbar />
      </div>
      
      <div class="main">
        <Header />
        <main>
          <router-view />
        </main>
      </div>
    </div>

    <AdaptiveError v-if="adaptiveError"/>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  width: 100%;
  overflow: hidden;
}

.main {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
}
</style>
