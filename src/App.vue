<script setup>
// console.log($route.meta.layout);
</script>

<template>
  
  <main>
    <component :is="$route.meta.layout || 'div'">
      <router-view />
    </component>
  </main>
  
</template>


