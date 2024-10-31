import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LayoutDefault from '@/layouts/LayoutDefault.vue'
import Login from '@/views/auth/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
{
  path: '/',
  name: 'home',
  component: LayoutDefault,
  meta: {
    title: 'Home'
  },
  children:[
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
  ]
},
{
      path: '/auth/login',
      name: 'login',
      component: () => Login
}
  ]
})

export default router
