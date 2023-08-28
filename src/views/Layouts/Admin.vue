<script setup>
import Header from '@/views/Layouts/Partials/Admin/Navbar.vue'
import AdminFooter from '@/views/Layouts/Partials/Admin/Footer.vue'
import Sidebar from '@/views/Layouts/Partials/Admin/Sidebar.vue'

// import Header from '@/Admin/Partials/Navbar.vue'
// import Sidebar from '@/Admin/Partials/Sidebar.vue'

</script>

<template>
    <!-- <div class="has-background-secondary">
        <AdminNavbar />
        <AdminSidebar />
        <slot/>

        <AdminFooter />
    </div> -->
    <div class="flex h-[100dvh] overflow-hidden">
        <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />
        <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

            <main class="grow">
                <slot />
            </main>
        </div>
    </div>
</template>

