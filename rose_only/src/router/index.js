import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/home.vue'
import Detail from '@/components/Detail.vue'

Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
    },
    {
      path: '/detail/pid/:pid/cid/:cid',
      name: 'detail',
      component: Detail
    },
  ]
})
