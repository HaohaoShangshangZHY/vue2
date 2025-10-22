// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import StudentCardView from '@/views/StudentCardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 其他路由...
    {
      path: '/students',
      name: 'students',
      component: StudentCardView,
    },
  ],
})

export default router
