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
      //     path: '/message', component: () => import('../views/messa')}
      //   }
      // ]
    }
  ]
})

export default router
