<script setup>

</script>
<template>
    <div>
        <h1>Guest Header</h1>
        <router-link to="/">Home</router-link> |
        <router-link :to="{name: 'About', params: {id: 1}}">About</router-link>
    </div>
</template>


