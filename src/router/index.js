import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Guest/Pages/Home.vue'
const routes = [
    {
        path: '/',
        meta: {layout: 'GuestLayout'},
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        meta: {layout: 'BlankLayout'},
        name: 'About',
        component: () => import('@/views/Guest/Pages/About.vue')
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router