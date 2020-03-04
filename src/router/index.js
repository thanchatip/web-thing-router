import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import Event from '../views/eventForm.vue'
import Create from '../views/CreateEvent.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/addEvent/',
    name: 'Create',
    component: Create
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: Create
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
