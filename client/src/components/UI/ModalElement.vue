<script setup lang="ts">
import Sidebar from 'primevue/sidebar';
import { Bars3Icon } from '@heroicons/vue/24/solid'
import { ref } from 'vue';
import ButtonBurger from './ButtonBurger.vue';
import 'primeicons/primeicons.css'
const visible = ref<boolean>(false)

const changeModalValue = () => {
  visible.value = !visible.value
}
</script>

<template>
  <div class="element">
    <Sidebar v-model:visible="visible">
      <template #container="{ closeCallback }">
          <div class="column">
              <div class="header">
                  <!-- <span class="inline-flex align-items-center gap-2">
                      <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="..." fill="var(--primary-color-color)" />
                          <path d="..." fill="var(--text-color)" />
                      </svg>
                      <span class="font-semibold text-2xl text-primary">Your Logo</span>
                  </span> -->
                  <span>
                    <ButtonBurger @click="changeModalValue">
                      <Bars3Icon style="width: 20px; height: 20px;"/>
                    </ButtonBurger>
                  </span>
              </div>
              <div class="content">
                  <ul class="main-ul">
                      <li>
                          <div
                              v-ripple
                              v-styleclass="{
                                  selector: '@next',
                                  enterClass: 'hidden',
                                  enterActiveClass: 'slidedown',
                                  leaveToClass: 'hidden',
                                  leaveActiveClass: 'slideup'
                              }"
                              class="section p-ripple"
                          >
                              <span class="section__name">Доски</span>
                              <i class="pi pi-chevron-down"></i>
                          </div>
                          <ul class="secondary-ul">
                              <li>
                                  <a v-ripple class="item">
                                      <i class="pi pi-home item__icon"></i>
                                      <span class="icon__name">Dashboard</span>
                                  </a>
                              </li>
                              <li>
                                  <a v-ripple class="item">
                                      <i class="pi pi-bookmark item__icon"></i>
                                      <span class="icon__name">Bookmarks</span>
                                  </a>
                              </li>
                          </ul>
                      </li>
                  </ul>
                  <ul class="main-ul">
                      <li>
                          <div
                              v-ripple
                              v-styleclass="{
                                  selector: '@next',
                                  enterClass: 'hidden',
                                  enterActiveClass: 'slidedown',
                                  leaveToClass: 'hidden',
                                  leaveActiveClass: 'slideup'
                              }"
                              class="section p-ripple"
                          >
                              <span class="section__name">Документации</span>
                              <i class="pi pi-chevron-down"></i>
                          </div>
                          <ul class="secondary-ul">
                              <li>
                                  <a v-ripple class="item">
                                      <i class="pi pi-folder item__icon"></i>
                                      <span class="item__name">Projects</span>
                                  </a>
                              </li>
                              <li>
                                  <a v-ripple class="item">
                                      <i class="pi pi-chart-bar item__icon"></i>
                                      <span class="item__name">Performance</span>
                                  </a>
                              </li>
                              <li>
                                  <a v-ripple class="item">
                                      <i class="pi pi-cog item__icon"></i>
                                      <span class="item__name">Settings</span>
                                  </a>
                              </li>
                          </ul>
                      </li>
                  </ul>
              </div>
              <div class="footer">
                  <hr class="hr" />
                  <a v-ripple class="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                      <Avatar image="/images/avatar/amyelsner.png" shape="circle" />
                      <span class="font-bold">Amy Elsner</span>
                  </a>
              </div>
          </div>
      </template>
    </Sidebar>
    <ButtonBurger @click="changeModalValue">
      <Bars3Icon style="width: 20px; height: 20px;"/>
    </ButtonBurger>
  </div>
</template>

<style scoped>
.element {
  display: flex;
  justify-content: center;
}

.column {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 3px;
  flex-shrink: 0;
}

.content {
  overflow-y: auto;
}

.main-ul {
  list-style: none;
  padding: 12px;
  margin: 0;
}

.section {
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  cursor: pointer;
}

.section__name {
  font-weight: 500;
}

.secondary-ul {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

.item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 12px;
  border-radius: 4px;
  font-weight: 700;
  transition-duration: 150ms;
  transition-property: color, background-color;
}

.item:hover {
  background-color: #f0f0f0;
  color: #333;
}

.item::before {
  content: '';
  position: absolute;
  border-radius: inherit;
  background: rgba(0, 0, 0, 0.1);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease-out;
}

.item:hover::before {
  opacity: 1;
}

.item__icon {
  margin-right: 8px;
}

.icon__name {
  font-weight: 500;
}

.footer {
  margin-top: auto;
}

.hr {
  margin-bottom: 12px;
  margin-left: 12px;
  margin-right: 12px;
  border-top-width: 1px;
  border: none;
  border-color: #ddd;
  border-width: 1px;
  border-style: solid;
}

.profile {
  margin: 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 12px;
  gap: 8px;
  border-radius: 3px;
  font-weight: 700;
  transition-duration: 150ms;
  transition-property: color, background-color;
}

.profile:hover {
  background-color: #f0f0f0;
  color: #333;
}

</style>