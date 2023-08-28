<template>
    <router-link  v-if="type == 'link'" class="flex items-center gap-1 text-xs" :class="[isDisabled? 'disabled cursor-not-allowed text-gray-300':'text-blue-600']"  :disabled="isDisabled? true:false">
        <unicon :name="iconName" class="icon-xs" :fill="isDisabled? 'gray' : 'blue'"/>
        <span class="hidden sm:block"><slot></slot></span>
    </router-link>
    <button v-else-if="type == 'button'" class="flex items-center gap-1 text-xs" :class="[isDisabled? 'disabled cursor-not-allowed text-gray-300':'text-blue-600']" :disabled="isDisabled? true:false">
        <unicon :name="iconName" class="icon-xs" :fill="isDisabled? 'gray' : 'blue'"/>
        <span class="hidden sm:block"><slot></slot></span>
    </button>
</template>
<script>
    import { useRouter } from 'vue-router'
    
    export default{
        props:{
            type:{default:'button'},
            isDisabled:{default:false},
            iconName:{default:'bars'},
        },
    }
</script>
