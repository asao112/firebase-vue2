import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunName: "login" */ '../views/Login.vue')
  },
  {
    path: '/model',
    name: 'model',
    component: () => import(/* webpackChunName: "model" */ '../views/Model.vue')
  },
  {
    path: '/model2',
    name: 'model2',
    component: () => import(/* webpackChunName: "model2" */ '../views/Model2.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router