<template>
   <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
        <header class="px-5 py-4">
            <h2 class="font-semibold text-slate-800 dark:text-slate-100">{{setup.pageTitle}} <span class="text-slate-400 dark:text-slate-500 font-medium"> {{listData.data.length}} </span></h2>
        </header>
        <div>
            <div class="overflow-x-auto">
                <table class="table-auto w-full dark:text-slate-300 divide-y divide-slate-200 dark:divide-slate-700">
                    <thead class="text-xs uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-slate-200 dark:border-slate-700">
                        <slot name="thead"></slot>
                    </thead>
                
                    <tbody class="text-sm">
                        <slot name="tbody"></slot>
                    </tbody>
                </table>
            </div>
        </div>
   </div>
</template>

<script setup>
import { onMounted } from 'vue';  

const props = defineProps({
    setup:Object,
    listData:Object,
});

// onMounted(() => {
//     console.log(props.listData.data.length);
// })
</script>

<style scoped>

</style>