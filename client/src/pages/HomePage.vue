<script setup lang="ts">
import HomeUsers from '@/components/elements/home/HomeUsers.vue';
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
        <HomeUsers />
      </main>
    </div>
  </div>
</template>

<style scoped>
main {
  margin-top: 10px;
  padding-left: 15px;
  padding-right: 15px;
}
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