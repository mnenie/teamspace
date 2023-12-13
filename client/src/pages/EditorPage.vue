<script setup lang="ts">
import EditorElement from '@/components/elements/home/editor/EditorElement.vue'
import ButtonModal from '@/components/UI/ButtonModal.vue';
import { onMounted, ref, watch } from 'vue';
import { useDoc } from "@/store/docs"
import { useRoute } from 'vue-router';
import Navbar from '@/components/layout/Navbar.vue';
import Header from '@/components/layout/Header.vue';

const documentation = useDoc();
const router = useRoute();

const text = ref<string>("");

watch(
  () => router.params.id,
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
}

</script>

<template>
  <div class="content">
    <div>
      <Navbar />
    </div>
    <div class="main">
      <Header />
      <main>
        <div class="parent">
          <EditorElement :text="text" @input="text = $event.target.innerHTML" />
          <ButtonModal @click="handle" class="save-btn">Сохранить</ButtonModal>
        </div>
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

.parent {
  position: relative;
}

.save-btn {
  bottom: 40px;
  right: 40px;
  position: fixed;
  z-index: 13;
  color: white;
}
</style>