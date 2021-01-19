import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Contacts',
    component: () => import('../views/Contacts.vue'),
  },
  {
    path: '/contact/:id',
    name: 'Contact-Info',
    component: () => import('../views/Contact-Info.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
