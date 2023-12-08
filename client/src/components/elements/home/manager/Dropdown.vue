<script setup lang="ts">
const props = defineProps<{
  target: string
}>()

const emit = defineEmits(['onClickEdit', 'onClickDelete'])
</script>
<template>
  <div tabindex="1" class="dropdown-container">
    <div class="dropdown-menu">
      <div class="menu-items">
        <p @click="emit('onClickEdit', target)" class="edit-item">Edit {{ target }}</p>
        <p @click="emit('onClickDelete', target)" class="delete-item">Delete {{ target }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropdown-container {
  position: relative;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  right: 28px;
  top: 8px;
  display: none;
}

.menu-items {
  background-color: #fff;
  background-color: #333;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  width: 36px;
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 10;
}

.edit-item,
.delete-item {
  font-size: 0.75rem;
  font-weight: bold;
  width: 100%;
  padding: 0.75rem;
}

.edit-item:hover,
.delete-item:hover {
  cursor: pointer;
}

.text-red {
  color: #e53e3e;
}
</style>
