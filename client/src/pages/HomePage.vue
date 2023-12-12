<script setup lang="ts">
import KanbanBoard from '@/components/elements/home/board/KanbanBoard.vue';
import Container from '@/components/elements/home/list/Container.vue';
import NotFoundBoards from '@/components/elements/home/404/NotFoundBoards.vue'
import { useProject } from '../store/project';
const project = useProject()
</script>

<template>
  <div>
    <!-- <KanbanBoard /> -->

    <Container v-if="project.project" />
    <NotFoundBoards v-else />
  <!-- <img style="width: 100%; height: 100%; margin: 0 auto;" src="/img/shalawa.png"> -->
  </div>
</template>

<style scoped></style>