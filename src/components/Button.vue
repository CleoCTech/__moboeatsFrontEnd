<template>
    <button v-if="theme == 'success'" :type="type" class="btn dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-emerald-500"><slot></slot></button>
    <button v-if="theme == 'error'" :type="type" class="btn dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-rose-500"><slot></slot></button>
    <button v-if="theme == 'info'" :type="type" class="btn dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"><slot></slot></button>
</template>
<script>
    export default{
        props:{
            type:{default:'button'},
            theme:{default:'success'},
        },
    }
</script>
