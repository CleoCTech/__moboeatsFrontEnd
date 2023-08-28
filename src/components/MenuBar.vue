<template>
    <div>
        
        <div class="relative mb-8">
            <div class="absolute bottom-0 w-full h-px bg-slate-200 dark:bg-slate-700" aria-hidden="true"></div>
            <ul id="tabs" class="relative text-sm font-medium flex flex-nowrap -mx-4 sm:-mx-6 lg:-mx-8 overflow-x-scroll no-scrollbar">
                <li @click="activeTab('home')" class="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                    <a href="#" 
                    class="block pb-3 whitespace-nowrap " 
                    :class="active == 'home'? 
                    'text-indigo-500 border-b-2 border-indigo-500' :
                    'text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'" >Home
                    </a>
                </li>
                <li @click="activeTab('moreActions')" class="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                    <a href="#" 
                    class="block pb-3 whitespace-nowrap " 
                    :class="active == 'moreActions'? 
                    'text-indigo-500 border-b-2 border-indigo-500' :
                    'text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'" >More Actions
                    </a>
                </li>
                <li @click="activeTab('reports')" class="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                    <a href="#" 
                    class="block pb-3 whitespace-nowrap " 
                    :class="active == 'reports'? 
                    'text-indigo-500 border-b-2 border-indigo-500' :
                    'text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'" >Reports
                    </a>
                </li>
                <li class="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                    <a href="#" 
                    class="block pb-3 whitespace-nowrap " 
                    :class="active == 'charts'? 
                    'text-indigo-500 border-b-2 border-indigo-500' :
                    'text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'" >Charts
                    </a>
                </li>
            </ul>
            <div class="flexx flex-rowx pr-4 pl-1 pt-2">
                    <div v-if="active == 'home'" class="">
                        <x-standard-actions v-bind="{setup,selected}"
                            @onMultipleSelect="this.$parent.$parent.isMultipleSelect = !this.$parent.$parent.isMultipleSelect"
                            @onAttachments="this.$parent.isAttachments = !this.$parent.isAttachments"
                            @onFilter="onFilter"
                            @onExport="onExport"
                        />
                    </div>
                    <div v-if="active == 'moreActions'">
                        <em v-if="this.setup.settings.isMoreActions == false" class="text-blue-500">No more actions found</em>
                        <component v-if="this.setup.settings.isMoreActions != false && this.setup.settings.xMoreActions != null" :is="dynamicComponent" :selected="selected"></component>
                    </div>
                    <div v-if="active == 'reports'">
                        <em v-if="this.setup.settings.isReports == false"  class="text-blue-500">No reports found</em>
                        <component v-if="this.setup.settings.isReports != false" :is="dynamicComponent" :indexRoute="this.setup.settings.indexRoute" ></component>
                    </div>
                    <div v-if="active == 'charts'">
                        <em v-if="this.setup.settings.isCharts == false"  class="text-blue-500">No charts found</em>
                        <component v-if="this.setup.settings.isCharts != false" :is="dynamicComponent" :indexRoute="this.setup.settings.indexRoute" ></component>
                    </div>
                </div>
        </div>
    </div>
</template>
<script>
    import xStandardActions from '@/components/StandardActions.vue'
    import {defineAsyncComponent,markRaw} from "vue";

    export default{
        components:{xStandardActions},
        props:{
            setup:Object,
            selected:{default:[]},
        },
        inject: ['isMultipleSelect'],
        data(){
            return{
                active:'home',
                dynamicComponent:{default:''},
            }
        },
        methods:{
            onFilter(isFilter){
                this.$parent.$refs.filter.isFilter = isFilter;
            },
            onExport(){
                this.$parent.$refs.exportData.submit();
            },
            activeTab(action){
                this.active = action;
                this.dynamicComponent = this.setDynamicComponent();
            },
            setDynamicComponent () {
                if(this.active == "moreActions" && this.setup.settings.isMoreActions != false && this.setup.settings.xMoreActions != null){
                    // return markRaw(defineAsyncComponent(() => import.meta.glob(`./${this.setup.settings.xMoreActions}.vue`) ))
                    return markRaw(defineAsyncComponent(() => import(`@/${this.setup.settings.xMoreActions}.vue`)))
                }
                // else if(this.active == "reports" && this.setup.settings.isReports != false){
                //     return markRaw(defineAsyncComponent(() => import(`@/Admin/Reports/${/[^/]*$/.exec(this.setup.settings.xFolder)[0]+'/ReportsTab'}.vue`)))
                // }
                // else if(this.active == "charts" && this.setup.settings.isCharts != false){
                //     return markRaw(defineAsyncComponent(() => import(`@/Admin/Charts/${/[^/]*$/.exec(this.setup.settings.xFolder)[0]+'/ChartsTab'}.vue`)))
                // }
            },
            onMultipleSelect () {
                this.isMultipleSelect.value = !this.isMultipleSelect.value
            }
        },
    }
</script>

