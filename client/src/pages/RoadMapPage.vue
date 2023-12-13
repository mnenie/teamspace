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
    { title: 'Проектирование', date: '15/10/2020 10:30', id: 2, roadmapId: 1, body: 'На данном этапе мы проектировали фронт разработку'},
    { title: 'Проектирование', date: '15/10/2020 10:30', id: 3, roadmapId: 1, body: 'На данном этапе мы проектировали фронт разработку'},
    { title: 'Проектирование', date: '15/10/2020 10:30', id: 1, roadmapId: 1, body: 'На данном этапе мы проектировали фронт разработку'},
    { title: 'Проектирование', date: '15/10/2020 10:30', id: 2, roadmapId: 1, body: 'На данном этапе мы проектировали фронт разработку'},
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
      <!-- <main ref="scrollContainer">
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
      </main> -->
      <div style="position: relative;">
        <div class="absolute">
          <Timeline :value="events" align="alternate" class="absolute" layout="horizontal">
            <template #content="slotProps">
              <div class="card mt-3">
                <div class="title">{{ slotProps.item.title }}</div>
                <div class="subtitle">{{ slotProps.item.date }}</div>
                <div class="card-content">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
                    numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis
                    esse,
                    cupiditate neque quas!
                  </p>
                  <!-- <button class="btn-read">Read more</button> -->
                </div>
              </div>
            </template>
          </Timeline>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css">
/* .roadmap {
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
} */

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

.absolute {
  width: 100%;
  overflow-x: auto;
  display: flex;
  position: absolute;
  gap: 20px;
  padding: 10px 10px 20px 10px;
  height: 83vh;
  overflow-y: hidden;
}

.marker {
  display: flex;
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  z-index: 1;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
}

.card {
  margin-top: 1.5rem;
  width: 300px;
  height: 200px;
  padding: 1rem;
  border-radius: 0.375rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
}

.title {
  font-weight: bold;
}

.subtitle {
  margin-top: 0.25rem;
  color: #333;
}

.card-content {
  margin-top: 0.75rem;
}

.btn-read {
  background-color: #3490dc;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
}
</style>
