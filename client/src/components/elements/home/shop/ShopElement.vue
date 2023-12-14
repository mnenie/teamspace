<script setup lang="ts">
import type { IProduct } from '@/types/Product';
import ProjectLink from '@/components/UI/ProjectLink.vue';
import { useModal, ModalsContainer } from 'vue-final-modal'
import { onMounted } from 'vue';
import { useStore } from '@/store/shop';
import { useProject } from '@/store/project';
import ModalAddProduct from '@/components/UI/ModalAddProduct.vue'
const store = useStore();
const project = useProject();

onMounted(async () => {
  await store.getProducts(project.project.id!);
})

const { open, close } = useModal({
  component: ModalAddProduct,
  attrs: {
    onClose() {
      close()
    },
    onConfirm(){
      close()
    }
  }
})

const prouctDelete = async (id: number) => {
  await store.deleteProduct(id);
}
</script>

<template>
  <div class="header-setting">
    <h3>Товары</h3>
    <button @click="open">Добавить товар</button>

  </div>
  <div v-if="store.products.length === 0" class="raduite">
    <h3>Добавляйте товары, чтобы радовать и мотивировать команду!</h3>
  </div>
  <div class="members" v-for="product in store.products" :key="product.id">
    <div class="member">
      <div class="member-left">
        <div class="circle">
          <i class="pi pi-shopping-cart" style="color:var(--green-btn-color)"></i>
        </div>
        <div class="text">
          <span class="name">{{ product && product.name ? product.name : '' }}</span>
          <span v-if="product.count == -1" class="role">Неограничено</span>
          <span v-else class="role"> Осталось: {{ product.count }}</span>

        </div>
      </div>
      <span class="points">Стоимость: <span>{{ product.cost }}</span><i @click="prouctDelete(product.id!)"
          style="margin-left: 20px;" class="pi pi-delete-left hover__red"></i></span>

    </div>
    <ModalsContainer />
  </div>
</template>

<style scoped>
.hover__red:hover {
  color: red;
  cursor: pointer;
}

.raduite {
  margin-top: 60px;
  text-align: center;
}

.header-setting {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-setting>h3 {
  color: var(--text-color);
  font-size: 25px;
}

.header-setting>button {
  background: rgb(229, 229, 229);
  border: none;
  cursor: pointer;
  border-radius: 5px;
  padding: 5px 10px;
  color: var(--text-color);
  margin-right: 30px;
}

.header-setting>button:hover {
  opacity: 0.7;
}

.members {
  display: flex;
  flex-direction: column;
}

.member {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.member-left {
  display: flex;
}

.circle {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

.circle>span {
  color: var(--white-color);
  font-size: 20px;
}

.text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.name {
  margin-bottom: 5px;
}

.role {
  color: var(--text-color);
  font-size: 13px;
}

.points {
  margin-right: 30px;
}

.points>span {
  color: #359f39;
}
</style>