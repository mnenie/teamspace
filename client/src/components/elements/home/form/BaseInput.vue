<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps(['modelValue', 'inputName', 'isRequired', 'darkMode']);
const error = ref(false);
const emit = defineEmits(['update:modelValue']);

const onInput = (e) => {
  if (props.isRequired && !e.target.value.trim()) {
    error.value = true;
    emit('update:modelValue', e.target.value);
  } else {
    error.value = false;
    emit('update:modelValue', e.target.value);
  }
};

defineExpose({
  error,
});
</script>

<template>
  <div class="input-container">
    <label v-if="inputName" :for="inputName" class="label">
      {{ inputName }}
    </label>
    <input :id="inputName" class="input" :class="{
      'error': error,
      'dark-input': darkMode,
      'dark-bg-dark-grey': darkMode,
      'placeholder-dark': darkMode
    }" :value="modelValue" @input="onInput" v-bind="$attrs" />
    <p v-if="error" class="error-message">
      Can't be empty
    </p>
  </div>
</template>

<style scoped lang="css">
.input-container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
}

.label {
  color: #757575;
  font-size: 0.75rem;
  font-weight: bold;
}

.input {
  flex: 1;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  transition: border-color 0.3s;
  outline: none;
}

.input.dark-input {
  color: #fff;
}

.input.dark-bg-dark-grey {
  background-color: #333;
}

.input.placeholder-dark::placeholder {
  color: #fff;
}

.input.error {
  border-color: #e53e3e;
}

.error-message {
  position: absolute;
  right: 1rem;
  bottom: 0.5rem;
  color: #e53e3e;
  font-size: 0.75rem;
}
</style>
