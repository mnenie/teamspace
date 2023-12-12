import { AUTH_ROUTE, CHAT_ROUTE, EDITOR_ROUTE, HOME_ROUTE, MAIN_PAGE, REGISTRATION_ROUTE, BOARD_ROUTE, NOTFOUND_ROUTE, SETTINGS_ROUTE } from '@/utils/consts'
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
      path : BOARD_ROUTE + '/:id',
      name : 'board',
      component: () => import('@/components/elements/home/list/Container.vue')
    },
    {
      path: EDITOR_ROUTE,
      name: 'editor',
      component: () => import('@/pages/EditorPage.vue')
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
    {
      path: CHAT_ROUTE,
      name: 'chat',
      component: () => import('@/pages/ChatPage.vue')
    },
    {
      path: MAIN_PAGE,
      name: 'main',
      components:{
        default: () => import('@/pages/404.vue'),
        additionalView: () => import('@/pages/MainPage.vue'),
      }
    },
    {
      path: NOTFOUND_ROUTE,
      name: '404',
      component: () => import('@/pages/404.vue')
    },
    {
      path: SETTINGS_ROUTE,
      name: 'settings',
      component: () => import('@/pages/SettingsPage.vue')
    },
  ]
})

export default router