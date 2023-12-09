<script setup lang="ts">
import HeadPartHome from '../elements/home/HeadPartHome.vue';
import HeaderItem from './header/HeaderItem.vue';
</script>

<template>
  <div class="header">
    <HeaderItem />
    <HeadPartHome />
  </div>
</template>

<style scoped>
.header{
  display: flex;
  flex-direction: column;
}
</style>