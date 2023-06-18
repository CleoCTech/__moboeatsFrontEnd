<script setup>
import BlankNavbar from '@/views/Layouts/Partials/Blank/Navabar.vue'
import BlankFooter from '@/views/Layouts/Partials/Blank/Footer.vue'
</script>

<template>
    <div class="has-background-info">
        
        <BlankNavbar />
        <slot/>

       <BlankFooter />
    </div>
</template>