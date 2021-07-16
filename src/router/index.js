import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/Registration')
    },
    {
      path: '/:id',
      component: () => import('../views/UserPage')
      // children: [
      //   {
      //     path: "/message:id",
      //     component: () => import("../views/Messages")
      //   }
      // ]
    },
    {
      path: '/message',
      component: () => import('../views/Messages')
    }
  ]
})

export default router
