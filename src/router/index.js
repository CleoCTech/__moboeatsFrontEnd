import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Guest/Pages/Home.vue'

/*** layouts */
import BlankLayout from '@/views/Layouts/Blank.vue'
import GuestLayout from '@/views/Layouts/Guest.vue'
import AdminLayout from '@/views/Layouts/Admin.vue'


const routes = [
    {
        path: '/',
        meta: {layout: GuestLayout},
        name: 'Home',
        component: Home,
        props: true, // Enable passing route params as props
        
    },
    {
        path: '/about/:id',
        meta: {layout: BlankLayout},
        name: 'About',
        component: () => import('@/views/Guest/Pages/About.vue')
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router