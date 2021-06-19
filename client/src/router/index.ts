import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/browse',
    name: 'Browse',
    component: () => import('@/views/Browse.vue'),
  },
  {
    path: '/manage',
    name: 'Manage',
    component: () => import('@/views/Manage.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('@/views/User.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;
