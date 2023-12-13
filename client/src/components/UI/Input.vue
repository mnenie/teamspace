<script setup lang="ts">
defineProps<{
  placeholder: string
  modelValue: string | number
  readonly?: boolean
}>()
defineEmits(["update:modelValue"]);
</script>

<template>
    <span class="p-input-icon-left">
      <i class="pi pi-chevron-right" :class="readonly ? 'none' : ''"></i>
      <input class="input_form" :placeholder="placeholder" :value="modelValue" :readonly=readonly
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" :class="readonly ? 'readonly' : ''">
    </span>
</template>

<style scoped>
.readonly {
  font-size: 17px;
  color: black;
  padding: 10px !important;
}
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
.none {
  display: none;
}
</style>