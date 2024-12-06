import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/blog/:id',
      name: 'Blog',
      component: () => import('../views/Blog.vue')
    },
    {
      path: '/blog/edit/:id?',
      name: 'BlogEdit',
      component: () => import('../views/BlogEdit.vue')
    }
  ]
})

export default router
