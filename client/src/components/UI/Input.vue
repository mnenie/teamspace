<script setup lang="ts">
defineProps<{
  placeholder: string
  modelValue: string | number
}>()
defineEmits(["update:modelValue"]);
</script>

<template>
    <span class="p-input-icon-left">
      <i class="pi pi-chevron-right"></i>
      <input class="input_form" :placeholder="placeholder" :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)">
    </span>
</template>

<style scoped>
.p-input-icon-left {
    display: block;
    width: 100%;
    position: relative;
    display: inline-block;
}

.p-input-icon-left > i,
.p-input-icon-left > svg {
    position: absolute;
    top: 50%;
    margin-top: -5px;
    font-size: 10px;
}

.input_form {
    margin: 0;
    height: 50px;
    width: 100%;
    padding: 10px 0 10px 35px;
    font-family: sans-serif;
    color: #4a5568;
    background-color: #ffffff;
    border-width: 1px;
    border-color: black;
    transition-property: color;
    transition-duration: 200ms;
    appearance: none;
    border-radius: 8px;
}

.input_form:hover {
    border-color: #9ba1aa;
}

.input_form:focus {
    outline: none;
    outline-offset: 0;
}

/* .input_form {
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
} */
</style>