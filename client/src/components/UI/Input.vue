<script setup lang="ts">
defineProps<{
  placeholder: string
  modelValue: string | number
}>()
defineEmits(["update:modelValue"]);
</script>

<template>
  <input class="input_form" :placeholder="placeholder" :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)">
</template>

<style scoped>
.input_form {
  padding: 15px 25px;
  border-radius: 5px;
  border: 1px solid var(--gray-200-color);
  background: var(--white-color);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 1.5px;
  color: var(--gray-600-color);
  transition: 0.15s ease;
  outline: none;
}

.input_form:hover {
  border: 1px solid var(--purple-color);
  color: var(--black-color);

  &::placeholder {
    color: var(--black-color);
  }
}

.input_form:focus {
  border: 1px solid var(--purple-color);
  color: var(--black-color);

  &::placeholder {
    color: var(--black-color);
  }
}
</style>