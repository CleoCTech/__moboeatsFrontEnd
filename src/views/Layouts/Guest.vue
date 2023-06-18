<script setup>
import GuestNavbar from '@/views/Layouts/Partials/Guest/Navabar.vue'
import GuestFooter from '@/views/Layouts/Partials/Guest/Footer.vue'
</script>

<template>
    <div class="has-background-info">
        <GuestNavbar />
        <slot/>

       <GuestFooter />
    </div>
</template>

