<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import {useRouter, useRoute } from 'vue-router';

// Access the router and route instances
const route = useRoute();
const router = useRouter();
const isLoading = ref(true);
const props = defineProps({
//   id: {type: String, required: true},
  id: null ,
})

onMounted(() => {
    console.log(props.id);
    console.log(route.params.id);
    isLoading.value =false
})

// Use the 'id' prop directly
const receivedId = ref(props.id);

// Watch for changes in the route parameter
watchEffect(() => {
    isLoading.value =true
    if (receivedId.value!== props.id) {
        console.log(receivedId.value);
        console.log(props.id);
        receivedId.value = route.params.id;
        // route.params.id = props.id;
    }
    // receivedId.value = route.params.id;
    isLoading.value =false
});

setTimeout(() => {
    isLoading.value =true
    route.params.id = 5
    receivedId.value = route.params.id;
    router.replace({ params: { ...route.params } });
    isLoading.value =false
}, 3000);

</script>

<template>
    <div v-if="isLoading" class="loader">
        <p>Loading...</p>
    </div>
    <div v-else class="about">
        <h1>About Page uses a diferent Layout from Home Page</h1>
        <p>Received ID: {{ receivedId }}</p>
    </div>
</template>