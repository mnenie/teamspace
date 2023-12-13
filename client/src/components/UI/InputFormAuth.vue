<script setup lang="ts">
import { AtSymbolIcon, LockOpenIcon, UserPlusIcon } from '@heroicons/vue/24/outline'
interface Props {
  plholder: string
  modelValue: string
  type: string
}
const props = defineProps<Props>()
</script>

<template>
  <div class="input_form">
    <AtSymbolIcon v-if="plholder === 'Введите email'" style="width: 16px; height: 16px;" />
    <LockOpenIcon v-if="plholder === 'Введите пароль'" style="width: 16px; height: 16px;" />
    <UserPlusIcon v-if="plholder === 'Введите имя' || plholder === 'Введите фамилию'" style="width: 16px; height: 16px;" />
    <input :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" class="input" :placeholder="plholder" :type="type">
  </div>
</template>

<style scoped>
.input_form {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  font-size: 14px;
  font-variation-settings: "wght" 600;
  line-height: 100%;
  color: #a6acbf;
  background-color: #fff;
  border: 2px solid transparent;
  border-radius: 8px;
  transition: all .3s ease;
  cursor: text;
  gap: 5px;
}

.input {
  padding: 0 14px 0 9px;
  height: 44px;
  width: 100%;
  border-radius: 8px;
  outline: none;
  border: none;
  background-color: inherit;
  transition: none;
  width: 100%;
}
</style>