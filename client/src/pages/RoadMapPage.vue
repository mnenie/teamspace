<script setup lang="ts">
import Timeline from 'primevue/timeline';
import { ref } from "vue";
import Navbar from '@/components/layout/Navbar.vue';
import Header from '@/components/layout/Header.vue';
// import type {IInterval} from '@/types/Interval.ts'
import ButtonModal from '@/components/UI/ButtonModal.vue';
import { ModalsContainer, useModal } from 'vue-final-modal'
import AddInterval from '@/components/UI/AddInterval.vue';

export interface IInterval{
    id : number;
    roadmapId : number;
    date : string;
    title : string;
    body : string;
}

const events = ref<Array<IInterval>>([
  {roadmapId: 1, id: 1, date: '15/10/2020', title: 'Фронтенд разработка', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pharetra velit finibus elit facilisis, a iaculis ligula volutpat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum eget nunc at erat efficitur sodales. Nunc mattis leo ipsum, auctor condimentum magna ultrices at. Maecenas sit amet.'},
  {roadmapId: 1, id: 1, date: '15/10/2020', title: 'Фронтенд разработка', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pharetra velit finibus elit facilisis, a iaculis ligula volutpat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum eget nunc at erat efficitur sodales. Nunc mattis leo ipsum, auctor condimentum magna ultrices at. Maecenas sit amet.'},
  {roadmapId: 1, id: 1, date: '15/10/2020', title: 'Фронтенд разработка', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pharetra velit finibus elit facilisis, a iaculis ligula volutpat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum eget nunc at erat efficitur sodales. Nunc mattis leo ipsum, auctor condimentum magna ultrices at. Maecenas sit amet.'},
  {roadmapId: 1, id: 1, date: '15/10/2020', title: 'Фронтенд разработка', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pharetra velit finibus elit facilisis, a iaculis ligula volutpat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum eget nunc at erat efficitur sodales. Nunc mattis leo ipsum, auctor condimentum magna ultrices at. Maecenas sit amet.'},
  {roadmapId: 1, id: 1, date: '15/10/2020', title: 'Фронтенд разработка', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pharetra velit finibus elit facilisis, a iaculis ligula volutpat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum eget nunc at erat efficitur sodales. Nunc mattis leo ipsum, auctor condimentum magna ultrices at. Maecenas sit amet.'},
  {roadmapId: 1, id: 1, date: '15/10/2020', title: 'Фронтенд разработка', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pharetra velit finibus elit facilisis, a iaculis ligula volutpat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum eget nunc at erat efficitur sodales. Nunc mattis leo ipsum, auctor condimentum magna ultrices at. Maecenas sit amet.'},
  {roadmapId: 1, id: 1, date: '15/10/2020', title: 'Фронтенд разработка', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pharetra velit finibus elit facilisis, a iaculis ligula volutpat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum eget nunc at erat efficitur sodales. Nunc mattis leo ipsum, auctor condimentum magna ultrices at. Maecenas sit amet.'},
]);

const handleWheel = (event: WheelEvent) => {
  let scrollEl = document.querySelector('.p-timeline')
  const target = event.target as HTMLElement
  if (scrollEl && target.closest('.card') == null) {
    scrollEl.scrollLeft += event.deltaY;
  }
};

const timelineRef = ref<HTMLElement | null>(null);
  const { open, close } = useModal({
    component: AddInterval,
    attrs: {
        onConfirm() {
            close()
        },
        onClose() {
            close()
        }
    }

})
</script>

<template>
  <div class="content">
    <div>
      <Navbar />
    </div>

    <div class="main">
      <Header />
      <div class="main-cont" style="overflow-x: auto;">
        <Timeline :value="events" align="alternate" class="timeline" layout="horizontal" @wheel="handleWheel" ref="timelineRef">
          <template #content="slotProps">
            <div class="card">
              <div class="title">{{ slotProps.item.title }}</div>
              <div class="date">{{ slotProps.item.date }}</div>
              <div class="card-content">
                <p>
                  {{ slotProps.item.body }}
                </p>
              </div>
            </div>
          </template>
        </Timeline>
        <ButtonModal class="save-btn" @click="open()">
          <i class="pi pi-plus"></i>
          Добавить
        </ButtonModal>
      </div>
    </div>
  </div>
  <ModalsContainer />
</template>

<style lang="css">
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

.main-cont {
  /* overflow-x: auto; */
}

.timeline {
  overflow-x: auto;
  width: 100%;
  display: flex;
  position: absolute;
  gap: 20px;
  padding: 10px 10px 20px 10px;
  height: 83vh;
  overflow-y: hidden;
}

.card {
  margin-top: 1.5rem;
  width: 300px;
  height: 200px;
  padding: 1rem;
  border-radius: 0.375rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  border: 3px solid var(--green-btn-color);
  overflow-y: auto;
}

.title {
  font-weight: bold;
}

.date {
  margin-top: 0.25rem;
  color: #333;
  font-size: 12px;
}

.card-content {
  margin-top: 0.75rem;
}

.save-btn {
  bottom: 30px;
  right: 40px;
  position: fixed;
  z-index: 13;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pi-plus {
  font-size: 12px;
  margin-right: 10px;
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