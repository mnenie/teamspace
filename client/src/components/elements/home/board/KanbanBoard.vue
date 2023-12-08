<template>
  <div class="main_content">
    <div v-dragscroll:nochilddrag class="content" :class="managerStore.sidebar ? 'active' : ''">
      <div data-dragscroll class="content_inside ">
        <div data-dragscroll v-if="boardsStore.getColumns" class="" style="display: flex;">
          <Board data-dragscroll />
          <AddNewColumn class="" />
        </div>
      </div>
    </div>
  </div>
  <div class="absolute-container">
    <TaskView v-if="managerStore.taskView" />
    <TaskForm v-if="managerStore.taskForm.visible" />
    <Delete v-if="managerStore.delete.visible" />
    <BoardForm v-if="managerStore.boardForm.visible" />
    <SidebarMobile v-if="managerStore.sidebarMobile" />
  </div>
</template >
  
<script setup lang="ts">
import Board from './Board.vue'
// import TaskView from './components/manager/TaskView.vue'
// import TaskForm from './components/manager/TaskForm.vue';
// import Delete from './components/manager/Delete.vue';
// import BoardForm from './components/manager/BoardForm.vue';
// import SidebarMobile from './components/manager/SidebarMobile.vue';


import { onMounted } from 'vue';
import { useBoardsStore } from '@/store/boards';
import { useManagerStore } from '@/store/manager';
import AddNewColumn from './AddNewColumn.vue';

const boardsStore = useBoardsStore();
const managerStore = useManagerStore();
onMounted(async () => {
  boardsStore.$subscribe((mutations, state) => {
    localStorage.setItem('data', JSON.stringify(state))
  })
  const storageData = localStorage.getItem("data")
  if (storageData === null) {
    const jsonData = await import("@/assets/data.json")
    boardsStore.boards = jsonData.boards;
  } else {
    boardsStore.$state = JSON.parse(storageData)
  }
})
</script>

<style scoped>
.main_content {
  display: flex;
  width: 100%;
}

.content {
  position: absolute;
  height: 100%;
  width: 100%;
  min-height: calc(100vh - 64px);
  max-height: calc(100vh - 64px);
  overflow: auto;
  background-color: #f4f4f4;
  transition: all 0.3s ease;
}

.container.active {
  transform: translateX(300px);
  max-width: calc(100vw + 300px);
}

.content_inside {
  margin-left: auto;
  margin-right: auto;
  width: 91%;
  padding-top: 1.5rem;
  padding-bottom: 3.75rem;
}

.absolute-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  max-width: 100%;
}
</style>
