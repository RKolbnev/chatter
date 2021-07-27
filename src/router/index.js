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
    },
    {
      path: '/message',
      component: () => import('../views/Messages'),
      children: [
        {
          path: ':chatRoomID',
          component: () => import('../views/ChatRoom')
        }
      ]
    }
  ]
})

export default router
