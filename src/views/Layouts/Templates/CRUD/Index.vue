<template>
    <div>
        <x-menu-bar v-bind="{setup,selected}"></x-menu-bar>
        <!-- <div class="flex flex-col sm:flex-row gap-1 sm:gap-0 mt-1 sm:mt-16 bg-gray-800"> -->
        <div class="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto">
            <x-filter v-if="setup.settings.isSearch" :columns="setup.columns" ref='filter'/>
            <!-- Page header -->
            <div class="sm:flex sm:justify-between sm:items-center mb-8">

                <!-- Left: Title -->
                <div class="mb-4 sm:mb-0">
                    <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">{{setup.pageTitle}}</h1>
                </div>

                <!-- Right: Actions  -->
                <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <!-- Delete button -->
                <DeleteButton :selectedItems="selected" @destroy="destroy" />
                <!-- Dropdown -->
                <DateSelect />
                <!-- Filter button -->
                <FilterButton align="right" />
                <!-- Add order button -->
                <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                    <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span class="hidden xs:block ml-2">Add Order</span>
                </button>              
            </div>

            </div>
            <slot></slot>
            <form method="POST" action="/admin/data-export" ref="exportData" target="_blank">
                <input type="hidden" name="_token" :value="$page.props.csrf_token"/>
                <input type="hidden" name="data" :value="JSON.stringify(listData.data !== undefined? listData.data:listData)"/>
                <input type="hidden" name="fileName" :value="setup.settings.caption+'.csv'"/>
                <input type="hidden" name="model" :value="setup.settings.model"/>
            </form>

            <!-- Pagination -->
          <div v-if="listData.data !== undefined && listData.data.length > 0" class="mt-8">
            <PaginationClassic :links="listData.links" :data="listData.data" />
          </div>  
        </div>
        <!-- <div v-if="listData.data !== undefined && listData.data.length > 0">
            <x-pagination :links="listData.links"/>
        </div> -->
        <span  v-if="listData.data !== undefined && listData.data.length == 0" class="flex justify-center text-sm p-2"><em>** No records found **</em></span>
    </div>
</template>
<script setup>
    import { ref, onMounted, watch } from 'vue';

    import xFilter from '@/components/Filter.vue';
    import xMenuBar from '@/components/MenuBar.vue'
    import DeleteButton from '@/components/DeleteButton.vue'
    import DateSelect from '@/Components/Mosaic/DateSelect.vue'
    import FilterButton from '@/Components/Mosaic/DropdownFilter.vue'
    import PaginationClassic from '@/Components/Mosaic/PaginationClassic.vue'

    import {  useIndex } from '@/composables/useIndex'

    const props = defineProps({
        setup:Object,
        listData:Object,
        selected:{default:[]},
    });

    const { 
        selected,
        destroy,
    } = useIndex(props)

    

   
</script>
