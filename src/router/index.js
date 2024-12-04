import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/components/Dashboard.vue'
import Devices from '@/components/Devices.vue'

const routes = [
  {
    path: '/',
    component: Dashboard
  },
  {
    path: '/devices',
    component: Devices
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
