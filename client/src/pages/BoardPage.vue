<script setup lang="ts">
import Container from '@/components/elements/home/list/Container.vue';
import Navbar from '@/components/layout/Navbar.vue';
import Header from '@/components/layout/Header.vue';
</script>

<template>
  <div class="content">
    <div>
      <Navbar />
    </div>

    <div class="main">
      <Header />
      <main>
        <Container />
      </main>
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