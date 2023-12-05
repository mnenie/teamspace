import { AUTH_ROUTE, HOME_ROUTE, REGISTRATION_ROUTE } from '@/utils/consts'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: HOME_ROUTE,
      name: 'name',
      component: () => import('@/pages/HomePage.vue')
    },
    {
      path: AUTH_ROUTE,
      name: 'auth',
      component: () => import('@/pages/AuthPage.vue')
    },
    {
      path: REGISTRATION_ROUTE,
      name: 'registration',
      component: () => import('@/pages/AuthPage.vue')
    },
  ]
})

export default router