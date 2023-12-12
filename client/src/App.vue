<script setup lang="ts">
import Navbar from './components/layout/Navbar.vue';
import Header from './components/layout/Header.vue';
import { AUTH_ROUTE, MAIN_PAGE, REGISTRATION_ROUTE } from './utils/consts';
</script>

<template>
  <div>
    <router-view v-if="$route.path === MAIN_PAGE || $route.path === AUTH_ROUTE || $route.path === REGISTRATION_ROUTE" name="additionalView">
    </router-view>
    
    <div v-else class="content">
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
