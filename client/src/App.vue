<script setup lang="ts">
import Navbar from './components/layout/Navbar.vue';
import Header from './components/layout/Header.vue';
</script>

<template>
  <div class="content">
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
.content{
  display: flex;
  height: 100%;
}
.main{
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>