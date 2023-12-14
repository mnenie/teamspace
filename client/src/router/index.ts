import {
  AUTH_ROUTE,
  CHAT_ROUTE,
  EDITOR_ROUTE,
  REGISTRATION_ROUTE,
  BOARD_ROUTE,
  NOTFOUND_ROUTE,
  DOC_ROUTE,
  SHOP_ROUTE
} from '@/utils/consts'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      components: {
        default: () => import('@/pages/HomePage.vue')
      },
      meta: { requiresAuth: true }
    },
    {
      path: BOARD_ROUTE + '/:id',
      name: 'board',
      components: {
        default: () => import('@/pages/BoardPage.vue')
      },
      meta: { requiresAuth: true }
    },
    {
      path: EDITOR_ROUTE,
      name: 'editor',
      component: () => import('@/pages/EditorPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: AUTH_ROUTE,
      name: 'auth',
      components: {
        special: () => import('@/pages/AuthPage.vue')
      },
      meta: { requiresAuth: false }
    },
    {
      path: REGISTRATION_ROUTE,
      name: 'registration',
      components: {
        special: () => import('@/pages/AuthPage.vue')
      },
      meta: { requiresAuth: false }
    },
    {
      path: CHAT_ROUTE + '/:id',
      name: 'chat',
      components: {
        default: () => import('@/pages/ChatPage.vue')
      },
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      name: 'main',
      components: {
        special: () => import('@/pages/MainPage.vue')
      },
      meta: { requiresAuth: false }
    },
    {
      path: NOTFOUND_ROUTE,
      name: '404',
      components: {
        special: () => import('@/pages/404.vue')
      },
      meta: { requiresAuth: false }
    },
    {
      path: DOC_ROUTE + '/:id',
      name: 'documentation',
      components: {
        default: () => import('@/pages/EditorPage.vue')
      },
      meta: { requiresAuth: true }
    },
    {
      path: SHOP_ROUTE,
      name: 'shop',
      components: {
        default: () => import('@/pages/ShopPage.vue')
      },
      meta: { requiresAuth: true }
    },
    {
      path: '/roadmap',
      name: 'roadmap',
      components: {
        default: () => import('@/pages/RoadMapPage.vue')
      },
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ path: '/:pathMatch(.*)*' })
  } else {
    next()
  }
})

export default router
