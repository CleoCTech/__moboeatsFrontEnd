<script setup>
import GuestNavbar from '@/views/Layouts/Partials/Guest/Navabar.vue'
import GuestFooter from '@/views/Layouts/Partials/Guest/Footer.vue'
</script>

<template>
    <div class="p-3 has-background-info">
        <GuestNavbar />
        <slot/>

       <GuestFooter />
    </div>
    <p class="italic">Guest Layout</p>
</template>

