<script setup lang="ts">
import { ref } from 'vue';
import { useBoardsStore } from '@/store/boards';

const emit = defineEmits(['onClickOption']);
const props = defineProps({
  editColumn: String,
});
const select = ref<null | HTMLElement>(null);
const options = ref<null | HTMLElement>(null);
const inputSelect = ref(null);
const store = useBoardsStore();

const onFocusSelect = () => {
  options.value?.scrollIntoView({ behavior: "smooth", block: "end" });
};

const onClickOption = (index, name) => {
  select.value?.blur();
  emit('onClickOption', { index, name });
};
</script>

<template>
  <div ref="select" @focusin="onFocusSelect" tabindex="1" class="select-container">
    <input ref="inputSelect" disabled v-bind="$attrs" class="select-input" />
    <IconArrowDown class="arrow-down" />
    <IconArrowUp class="arrow-up" />
    <div ref="options" class="options">
      <div @click="onClickOption(index, column.name)" class="option" v-for="(column, index) in store.getColumns" :key="column.id">
        {{ column.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.select-container {
  font-size: 0.875rem;
  color: #000;
  font-weight: bold;
  border: 1px solid #ccc;
  border-opacity: 0.25;
  border-radius: 0.25rem;
  padding: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.select-input {
  flex: 1;
  background-color: #fff;
  cursor: pointer;
}

.arrow-down {
  display: block;
}

.arrow-up {
  display: none;
}

.options {
  display: none;
  position: absolute;
  border-radius: 0.25rem;
  left: 0;
  top: 100%;
  margin-top: 1rem;
  width: 100%;
  background-color: #fff;
}

.option {
  padding: 1rem;
  color: #757575;
}

.select-container:hover .arrow-down {
  display: none;
}

.select-container:focus .arrow-down {
  display: none;
}

.select-container:hover .arrow-up {
  display: block;
}
</style>
