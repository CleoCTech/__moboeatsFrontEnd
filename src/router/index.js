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

    /**Auth */
    {
        path: '/login',
        meta: {layout: BlankLayout},
        name: 'Login',
        component: () => import('@/views/Admin/Pages/Auth/Login.vue')
    },
    {
        path: '/register',
        meta: {layout: BlankLayout},
        name: 'Register',
        component: () => import('@/views/Admin/Pages/Auth/Register.vue')
    },
    {
        path: '/forgot-password',
        meta: {layout: BlankLayout},
        name: 'ForgotPassword',
        component: () => import('@/views/Admin/Pages/Auth/ForgotPassword.vue')
    },
    {
        path: '/reset-password/:token',
        meta: {layout: BlankLayout},
        name: 'ResetPassword',
        component: () => import('@/views/Admin/Pages/Auth/ResetPassword.vue')
    },
    {
        path: '/admin/dashboard',
        meta: {layout: AdminLayout},
        name: 'Dashboard',
        component: () => import('@/views/Admin/Pages/Dashboard/Home.vue')
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router