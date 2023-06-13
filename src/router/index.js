import { createRouter, createWebHistory } from 'vue-router'
import About from '@/views/Guest/Pages/About.vue'
import Home from '@/views/Guest/Pages/Home.vue'
/**
 * layouts
 */
import BlankLayout from '@/views/Layouts/Blank.vue'
import GuestLayout from '@/views/Layouts/Guest.vue'
import AdminLayout from '@/views/Layouts/Admin.vue'


const routes = [
    {
        path: '/',
        meta: {layout: GuestLayout},
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        meta: {layout: BlankLayout},
        name: 'About',
        component: About
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router