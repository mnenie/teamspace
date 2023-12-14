<script setup lang="ts">
import Timeline from 'primevue/timeline';
import { ref } from "vue";
import Navbar from '@/components/layout/Navbar.vue';
import Header from '@/components/layout/Header.vue';
// import type {IInterval} from '@/types/Interval.ts'
import ButtonModal from '@/components/UI/ButtonModal.vue';
import { ModalsContainer, useModal } from 'vue-final-modal'
import AddInterval from '@/components/UI/AddInterval.vue';

export interface IInterval {
  id: number;
  roadmapId: number;
  date: string;
  title: string;
  body: string;
}

const events = ref<Array<IInterval>>([
  {
    roadmapId: 1, id: 1, date: '01/01/2023 - 01/03/2023', title: 'Планирование (Sprint Planning)', body: `На этом этапе команда определяет, какие задачи будут выполняться в следующем спринте. Задачи выбираются из backlog'а (списка задач), и команда обсуждает их и оценивает сложность. В результате планирования формируется backlog спринта.`},
  { roadmapId: 1, id: 2, date: '05/04/2023 - 15/06/2023', title: 'Разработка (Sprint Development):', body: `На этом этапе команда активно разрабатывает и тестирует функциональность, выбранную для реализации в текущем спринте. Работа ведется в тесном взаимодействии между разработчиками, тестировщиками и другими членами команды.` },
  { roadmapId: 1, id: 3, date: '06/07/2023 - 23/09/2023', title: 'Тестирование и Интеграция (Sprint Testing/Integration)', body: `На этом этапе команда активно разрабатывает и тестирует функциональность, выбранную для реализации в текущем спринте. Работа ведется в тесном взаимодействии между разработчиками, тестировщиками и другими членами команды.
` },
  { roadmapId: 1, id: 4, date: '15/09/2023 - 17/11/2023', title: 'Демонстрация и Оценка (Sprint Review/Showcase):', body: `Команда представляет результаты своей работы заказчику или заинтересованным сторонам. Это может быть демонстрация новых функций или улучшений. После демонстрации проводится обсуждение и оценка выполненной работы.
` },
  { roadmapId: 1, id: 5, date: '20/11/2023 - 12/01/2024', title: 'Ретроспектива (Sprint Retrospective):', body: `Команда анализирует свой опыт за прошедший спринт, выявляет успешные моменты и проблемы, а также обсуждает, как можно улучшить процесс работы. Результаты ретроспективы могут влиять на планирование следующего спринта.` },
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
        <Timeline :value="events" align="alternate" class="timeline" layout="horizontal" @wheel="handleWheel"
          ref="timelineRef">
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
  height: 220px;
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