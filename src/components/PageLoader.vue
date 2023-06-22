<template>
    <div v-if="isLoading" class="page-loader">
      <!-- Add your custom page loader content here -->
      Loading...
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isLoading = ref(false);
  </script>
  
  <style scoped>
  .page-loader {
    /* Add your custom styles for the page loader here */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
  }
  </style>
  