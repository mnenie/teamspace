<script setup lang="ts">
import EditorElement from '@/components/elements/home/editor/EditorElement.vue'
import ButtonModal from '@/components/UI/ButtonModal.vue';
import { onMounted,ref, watch } from 'vue';
import {useDoc} from "@/store/docs"
import { useRoute } from 'vue-router';
import Message from 'primevue/message';

const documentation = useDoc();
const router = useRoute();

const text = ref<string>("");
const showsuccess = ref<boolean>(false);

watch(
  () => router.params.id ,
  async (newValue) => {
    if (newValue) {
      await documentation.getSheetInfo(parseInt(router.params.id as string))  
      text.value = documentation.sheetInfo.body;
    }
  },
);


onMounted(async () => {
  await documentation.getSheetInfo(parseInt(router.params.id as string))  
  text.value = documentation.sheetInfo.body;
})

const handle = () => {
  documentation.saveSheet(text.value)
  showsuccess.value = true
  setTimeout(() => {
    showsuccess.value = false
  }, 2000)
}

</script>

<template>
  <div class="parent">
    <EditorElement :text="text" @input="text = $event.target.innerHTML"/>
    <ButtonModal @click="handle" class="save-btn">Сохранить</ButtonModal>
    <transition-group name="p-message" tag="div">
      <Message severity="success" class="success" v-if="showsuccess">
        <template #messageicon>
          <span></span>
        </template>
        <span class="ml-2">Успешно сохранено!</span>
      </Message>
    </transition-group>
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
.save-bt2{
  bottom: 40px;
  right: 80px;
  position: fixed;
  z-index: 13;
  color: white;
}
.success {
  bottom: 40px;
  left: -160px;
  position: absolute;
  z-index: 999;
  width: 300px;
  height: 30px;
}
.success {
  left: 20px;
  position: fixed;
  z-index: 999;
}
</style>