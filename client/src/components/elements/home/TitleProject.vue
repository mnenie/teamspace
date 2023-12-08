<script setup lang="ts">
import TitleItem from './TiltleItem.vue'
import SelectButtons from '@/components/UI/SelectButtons.vue';
</script>

<template>
  <div class="title_proj">
    <div class="content_1">
      <TitleItem />
    </div>
    <div class="content_2">
      <!-- <SelectButtons /> -->
    </div>
  </div>
</template>

<style scoped>
.title_proj {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  padding: 30px 10px;
  background-color: var(--white-color);
}

.content_1 {
  display: flex;
  align-items: center;
}

</style>