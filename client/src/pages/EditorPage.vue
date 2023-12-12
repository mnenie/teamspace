<script setup lang="ts">
import EditorElement from '@/components/elements/home/editor/EditorElement.vue'
import ButtonModal from '@/components/UI/ButtonModal.vue';


</script>

<template>
  <div class="parent">
    <EditorElement />
    <ButtonModal class="save-btn">Сохранить</ButtonModal>
  </div>
</template>

<style scoped>
.parent{
  position: relative;
}

.save-btn{
  bottom: 40px;
  right: 40px;
  position: fixed;
  z-index: 13;
  color: white;
}

</style>