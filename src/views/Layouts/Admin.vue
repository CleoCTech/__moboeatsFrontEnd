<script setup>
import AdminNavbar from '@/views/Layouts/Partials/Admin/Navbar.vue'
import AdminFooter from '@/views/Layouts/Partials/Admin/Footer.vue'
import AdminSidebar from '@/views/Layouts/Partials/Admin/Sidebar.vue'

</script>

<template>
    <div class="has-background-secondary">
        <AdminNavbar />
        <AdminSidebar />
        <slot/>

        <AdminFooter />
    </div>
</template>

