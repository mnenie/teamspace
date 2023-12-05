<script setup lang="ts">
import Sidebar from 'primevue/sidebar';
import { Bars3Icon } from '@heroicons/vue/24/solid'
import { ref } from 'vue';
import ButtonBurger from './ButtonBurger.vue';
const visible = ref<boolean>(false)

const changeModalValue = () => {
  visible.value = !visible.value
}
</script>

<template>
  <div class="card flex justify-content-center">
    <Sidebar v-model:visible="visible" header="Sidebar">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.</p>
    </Sidebar>
    <ButtonBurger @click="changeModalValue">
      <Bars3Icon style="width: 20px; height: 20px;"/>
    </ButtonBurger>
  </div>
</template>

<style scoped></style>