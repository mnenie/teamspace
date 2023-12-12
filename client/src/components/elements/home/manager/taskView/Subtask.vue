<script setup lang="ts">
const props = defineProps<{
  subtask: any,
  darkMode: boolean,
}>();
</script>

<template>
  <label class="checkbox-label" :class="{ 'dark-bg': darkMode, 'dark-hover-bg': darkMode }">
    <div class="checkbox-input"
      :class="{ 'cursor-pointer': true, 'checkbox-relative': true, 'checkbox-top-left': true, 'checkbox-translate': true }">
      <input class="cursor-pointer" v-model="subtask.isCompleted" type="checkbox" :id="subtask?.title">
      <div class="checkbox-checkbox" :class="subtask.isCompleted ? 'checked' : 'unchecked dark-unchecked'">
        <img v-if="subtask.isCompleted" src="@/assets/icons/icon-check.svg" alt="">
      </div>
    </div>
    <span class="checkbox-title"
      :class="{ 'line-through': subtask.isCompleted, 'dark-title': darkMode, 'dark-line-through': darkMode }">
      {{ subtask?.title }}
    </span>
  </label>
</template>


<style scoped lang="css">
.checkbox-label {
  cursor: pointer;
  background-color: #f2f2f2;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 0.25rem;
}

.checkbox-label.dark-bg {
  background-color: #333;
}

.checkbox-label.dark-hover-bg:hover {
  background-color: rgba(155, 89, 182, 0.25);
}

.checkbox-label:hover-bg:hover {
  background-color: #9b59b6;
}

.checkbox-label:hover-opacity-bg:hover {
  background-color: rgba(0, 0, 0, 0.25);
}

.checkbox-input {
  position: relative;
}

.checkbox-input.cursor-pointer {
  cursor: pointer;
}

.checkbox-input.checkbox-relative {
  position: relative;
}

.checkbox-input.checkbox-top-left {
  top: 50%;
  left: 50%;
}

.checkbox-input.checkbox-translate {
  transform: translateY(-50%) translateX(-50%);
}

.checkbox-checkbox {
  height: 1rem;
  width: 1rem;
  border-radius: 0.125rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}

.checkbox-checkbox.checked {
  background-color: #9b59b6;
}

.checkbox-checkbox.unchecked {
  background-color: #fff;
  border: 1px solid #ccc;
}

.checkbox-checkbox.dark-unchecked {
  background-color: #333;
}

.checkbox-title {
  font-weight: bold;
  font-size: 12px;
  color: #000;
}

.checkbox-title.line-through {
  text-decoration: line-through;
  opacity: 0.5;
}

.checkbox-title.dark-title {
  color: #fff;
  opacity: 0.5;
}

.checkbox-title.dark-line-through {
  text-decoration: line-through;
  opacity: 0.5;
}
</style>
