import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('./views/Home/Home.vue')
// const Home = () => import('./views/Home/Home.vue')
const CreateTemplate = () => import('./views/CreateTemplate/CreateTemplate.vue')
Vue.use(Router)
const routes = [
  {
    path: '/',
    redirect: '/createTemplate'
  },
  {
    path: '/home',
    name: 'home',
    component : Home
  },
  {
    path: '/createTemplate',
    name: 'createTemplate',
    component : CreateTemplate
  },
  ]
export default new Router({
  mode:'history',
  routes
})
