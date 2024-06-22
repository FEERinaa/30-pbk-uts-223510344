import { createRouter, createWebHistory } from 'vue-router';
import Todos from '../views/Todos.vue';
import Posts from '../views/Posts.vue';
import Albums from '../views/Albums.vue';

const routes = [
  {
    path: '/',
    name: 'Todos',
    component: Todos,
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts,
  },
  {
    path: '/albums',
    name: 'Albums',
    component: Albums,
  },
  {
    path: '/albums/:id',
    name: 'AlbumDetail',
    component: Albums,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
