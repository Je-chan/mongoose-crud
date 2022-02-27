import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Article from '../components/Article.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/:id',
      component: Article,
    },
  ],
});
