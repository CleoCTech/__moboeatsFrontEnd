<template>
    <div class="inline-flex font-medium rounded-full text-center px-2.5 py-0.5" >
        <slot></slot>
    </div>
</template>

<script setup>

const props = defineProps({
  bgColor: { default: 'bg-gray-300' },
});
</script>