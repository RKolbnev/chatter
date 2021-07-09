import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/Registration')
    },
    {
      path: '/user',
      component: () => import('../views/UserPage')
    }
  ]
})

export default router
