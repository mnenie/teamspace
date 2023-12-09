<script setup lang="ts">
import LineElement from '@/components/UI/LineElement.vue';
import { ref } from 'vue';
import FiltersElement from './FiltersElement.vue';
const title = ref('test')
</script>

<template>
  <div class="text">
    <div class="block_char">
      <span>{{ title.split('')[0].toUpperCase() }}</span>
    </div>
    <span class="title">{{ title }}</span>
    <div class="block_status">
      <span>активно</span>
    </div>
  </div>
  <LineElement />
  <FiltersElement />
  <LineElement />
</template>

<style scoped>
.text {
  display: flex;
  align-items: center;
  gap: 10px;
}

.block_char {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background: var(--proj-color);
}

.block_char>span {
  color: var(--white-color);
}

.text .title {
  font-weight: 500;
}

.block_status {
  position: relative;
  display: flex;
  gap: 10px;
  align-items: center;
  padding-left: 23px;
  color: #202430;
  white-space: nowrap;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  height: 16px;
  border-radius: 4px;
  background: #e8e8f2;
  padding-right: 4px;
}

.block_status::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 5px;
  height: 8px;
  width: 8px;
  border-radius: 50%;
  transform: translateY(-50%);
  background: var(--green-color);
}

.block_status>span {
  /*  */
}
</style>