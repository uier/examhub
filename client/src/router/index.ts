import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/browse',
    name: 'Browse',
    component: import('@/views/Browse.vue'),
  },
  {
    path: '/manage',
    name: 'Manage',
    component: import('@/views/Manage.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: import('@/views/Login.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
