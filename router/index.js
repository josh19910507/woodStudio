import { createRouter, createWebHistory } from 'vue-router'
import Door from '../src/views/Door.vue'
import BigDoor from '../src/views/BigDoor.vue'
import Design from '../src/views/Design.vue'
import Construction from '../src/views/Construction.vue'
const routes = [
  { path: '/', component: Door },
  { path: '/BigDoor', component: BigDoor },
  { path: '/Design', component: Design },
  { path: '/Construction', component: Construction },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
