import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 第一财经和qq权益兑换
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/blog/:id',
      name: 'blog',
      component: () => import('../views/Blog.vue')
    }
  ]
})

export default router
