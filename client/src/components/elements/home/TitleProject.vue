<script setup lang="ts">
import TitleItem from './TiltleItem.vue'
</script>

<template>
  <div class="title_proj">
    <div class="content_1">
      <TitleItem />
    </div>
    <!-- <div class="content_2">
      <TrashIcon style="color: var(--text-color); width: 18px; height: 18px;" />
      <span style="color: var(--text-color)">Удалить</span>
    </div> -->
  </div>
</template>

<style scoped>
.title_proj {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  padding: 10px;
  background-color: var(--white-color);
}

.content_1 {
  display: flex;
  align-items: center;
}
.content_2 {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 12px;
}

</style>