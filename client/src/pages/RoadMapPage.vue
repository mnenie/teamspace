<script setup lang="ts">
import Timeline from 'primevue/timeline';
import { ref } from "vue";
import Navbar from '@/components/layout/Navbar.vue';
import Header from '@/components/layout/Header.vue';

const events = ref([
  { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
  { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
  { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
  { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' },
  { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' },
  { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' },
  { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' },
  { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' },
  { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' },
  { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' },
  { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' },
  { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' },
]);
</script>

<template>
  <div class="content">
    <div>
      <Navbar />
    </div>

    <div class="main">
      <Header />
      <div style="position: relative;">
        <div class="absolute">
          <Timeline :value="events" align="alternate" class="absolute" layout="horizontal">
            <template #marker="slotProps">
              <span class="marker">
                <i :class="slotProps.item.icon"></i>
              </span>
            </template>
            <template #content="slotProps">
              <div class="card mt-3">
                <div class="title">{{ slotProps.item.status }}</div>
                <div class="subtitle">{{ slotProps.item.date }}</div>
                <div class="card-content">
                  <img v-if="slotProps.item.image" :src="`/images/product/${slotProps.item.image}`"
                    :alt="slotProps.item.name" width="200" class="shadow-1" />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
                    numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis
                    esse,
                    cupiditate neque quas!
                  </p>
                  <button class="btn-read">Read more</button>
                </div>
              </div>
            </template>
          </Timeline>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css">
.content {
  display: flex;
  width: 100%;
  overflow: hidden;
}

.main {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
}

.absolute {
  width: 100%;
  overflow-x: auto;
  display: flex;
  position: absolute;
  gap: 20px;
  padding: 10px 10px 20px 10px;
  height: 83vh;
  overflow-y: hidden;
}

.marker {
  display: flex;
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  z-index: 1;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
}

.card {
  margin-top: 1.5rem;
  width: 300px;
  height: 200px;
  padding: 1rem;
  border-radius: 0.375rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
}

.title {
  font-weight: bold;
}

.subtitle {
  margin-top: 0.25rem;
  color: #333;
}

.card-content {
  margin-top: 0.75rem;
}

.btn-read {
  background-color: #3490dc;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
}
</style>
