<script setup>
import { provide, shallowRef, onMounted } from 'vue';
import router from './router'
import layouts from '@/views/Layouts/layouts';

const layout = shallowRef('div')

router.afterEach((to) =>{
  layout.value = layouts[to.meta.layout] || 'div'
});
provide('app:layout', layout);

</script>

<template>
  <main>
    <component :is="layout || 'div'">
      <router-view />
    </component>
  </main>
  
</template>


