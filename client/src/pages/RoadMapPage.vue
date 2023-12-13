<script setup lang="ts">
import Timeline from 'primevue/timeline';
import { onBeforeUnmount, onMounted, ref } from "vue";
import Navbar from '@/components/layout/Navbar.vue';
import Header from '@/components/layout/Header.vue';

// id : number;
// roadmapId : number;
// date : string;
// title : string;
// body : string;

const events = ref([
    { title: 'Проектирование', date: '15/10/2020 10:30', id: 1, roadmapId: 1, body: 'На данном этапе мы проектировали фронт разработку'},
    { title: 'Проектирование', date: '15/10/2020 10:30', id: 2, roadmapId: 1, body: 'На данном этапе мы проектировали фронт разработку'},
    { title: 'Проектирование', date: '15/10/2020 10:30', id: 3, roadmapId: 1, body: 'На данном этапе мы проектировали фронт разработку'},
    { title: 'Проектирование', date: '15/10/2020 10:30', id: 1, roadmapId: 1, body: 'На данном этапе мы проектировали фронт разработку'},
    { title: 'Проектирование', date: '15/10/2020 10:30', id: 2, roadmapId: 1, body: 'На данном этапе мы проектировали фронт разработку'},

]);

const scrollContainer = ref<HTMLElement | null>(null)
let wheelHandler: EventListener | null = null;

onMounted(() => {
    if (scrollContainer.value) {
      wheelHandler = (event) => {
        const delta = Math.sign((event as WheelEvent).deltaY);
        scrollContainer.value!.scrollLeft += delta * 50;
      };

      scrollContainer.value.addEventListener('wheel', wheelHandler);
    }
});

onBeforeUnmount(() => {
  if (scrollContainer.value && wheelHandler) {
    scrollContainer.value.removeEventListener('wheel', wheelHandler);
  }
});
</script>

<template>
  <div class="content">
    <div>
      <Navbar />
    </div>

    <div class="main">
      <Header />
      <main ref="scrollContainer">
        <Timeline :value="events" align="top" layout="horizontal" class="roadmap">
          <template #content="slotProps">
              <div class="card">
                <h3>{{ slotProps.item.title }}</h3>
                <span>{{ slotProps.item.body }}</span>
              </div>
          </template>
          <template #opposite="slotProps">
              <small class="p-text-secondary">{{slotProps.item.date}}</small>
          </template>
      </Timeline>
      </main>
    </div>
  </div>
</template>

<style lang="css">
.roadmap {
  margin-left: 10px;
}
.card {
  padding: 5px;
  border: 4px solid var(--green-btn-color);
  border-radius: 8px;
  height: auto;
  max-width: 250px;
}
.card > h3{
  margin-bottom: 10px;
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
main {
  overflow-x: scroll;
  height: 85vh;
  width: 100%;
}
::-webkit-scrollbar {
    width: 0;
}

::-webkit-scrollbar-track {
    background-color: transparent;
}

::-webkit-scrollbar-thumb {
    background-color: transparent;
}
</style>
