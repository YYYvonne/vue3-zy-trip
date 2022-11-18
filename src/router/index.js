import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      // component: HomeView
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/home.vue')
    },
     {
      path: '/order',
      name: 'order',
      component: () => import('@/views/order/order.vue')
    },
     {
      path: '/favor',
      name: 'favor',
      component: () => import('@/views/favor/favor.vue')
    },
     {
      path: '/message',
      name: 'message',
      component: () => import('@/views/message/message.vue')
    }
  ]
})

export default router
