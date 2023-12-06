<script setup lang="ts">
import { ref } from 'vue';
import SelectButton from 'primevue/selectbutton';
const selected = ref(null)
const options = ref([
  { icon: 'pi pi-align-left', value: 'Left' },
  { icon: 'pi pi-align-right', value: 'Right' },
  { icon: 'pi pi-align-center', value: 'Center' },
  { icon: 'pi pi-align-justify', value: 'Justify' }
]);
</script>

<template>
  <div class="card">
    <SelectButton v-model="selected" :options="options" optionLabel="value" dataKey="value" aria-labelledby="custom">
      <template #option="slotProps">
        <i :class="slotProps.option.icon"></i>
      </template>
    </SelectButton>
  </div>
</template>

<style scoped>
.card {
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--green-color);
}
</style>