<template>
    <Link class="inline-flex rounded-full justify-center items-center px-2 py-1 border border-transparent text-xs text-white tracking-widest active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25 transition ease-in-out duration-150"><slot></slot></Link>
</template>
<script>
    import { Link } from '@inertiajs/vue3'
    export default{
        components:{Link},
    }
</script>


