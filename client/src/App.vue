<script setup lang="ts">
import Navbar from './components/layout/Navbar.vue';
import Header from './components/layout/Header.vue';
import MainPage from './pages/MainPage.vue';

</script>

<template>
  <router-view v-if="$route.path === '/main'" name="additionalView">

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
</template>

<style scoped>
.content {
  display: flex;
  width: 100%;
  
}

.main {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
}
</style>