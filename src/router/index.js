import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Guest/Pages/Home.vue'
import authMiddleware from './middleware/auth-middleware'
// import { useAuthStore } from '../stores/authStore';

/*** layouts */
import BlankLayout from '@/views/Layouts/Blank.vue'
import GuestLayout from '@/views/Layouts/Guest.vue'
import AdminLayout from '@/views/Layouts/Admin.vue'


const routes = [
    // Public routes
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

    // Protected routes
    {
        path: '/admin/dashboard',
        meta: {
            layout: AdminLayout,
            requiresAuth: true
        },
        name: 'Dashboard',
        component: () => import('@/views/Admin/Pages/Dashboard/Home.vue'),
    },

     /**Restaurant */
    {
        path: '/admin/restaurant',
        meta: {
            layout: AdminLayout,
            requiresAuth: true
        },
        name: 'Restaurant',
        component: () => import('@/views/Admin/Pages/Restaurant/Index.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// router.beforeEach((to, from, next) => {
//     const authStore = useAuthStore();
    
//     if(to.meta.requiresAuth && authStore.user == null){
//         next({name: 'Login'})
//     } else if(authStore.tokens.admin && (to.name === 'Login' || to.name === 'Register')){
//         console.log(authStore.tokens.admin);
//         next({name: 'Dashboard'})
//     }else {
//         console.log('next()');
//         next()
//     }
// })

router.beforeEach(authMiddleware)
export default router

