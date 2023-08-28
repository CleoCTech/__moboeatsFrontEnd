<script setup>
import { ref } from  'vue'
import { provide, getCurrentInstance } from 'vue'
import { indexProps, useIndex } from '@/composables/useIndex'
import Badge from '@/components/Badge.vue'

const active = ref('home')

const props = defineProps({...indexProps})

    const { 
        selected,
        onCheck,
        onRowClick,
        isSelected,
        xIndexTemplate, 
        isMultipleSelect, 
        destroy,

        ThCheckbox, 
        TdCheckbox,
        Td, 
        Tr, 
        handleToggleSelectAll,
        Th,
        Table
    } = useIndex(props)
   
    const showLoading = () => {
        context.$showLoading()
        setTimeout(() => {
            context.$hideLoading()
        }, 2000)
    }
    
    provide('onRowClick', onRowClick);
    provide('isMultipleSelect', isMultipleSelect);
</script>
<template>
    <div>
        <x-index-template :setup="setup" :listData="listData" :selected="selected">
            <Table :setup="setup" :listData="listData">
                <template #thead>
                    <tr class="">
                        <ThCheckbox :selected-items="selected" @toggle-select-all="handleToggleSelectAll" />
                        <!-- <x-tableth-checkbox v-if="isMultipleSelect"/> -->
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Location</Th>
                        <Th>Date Created</Th>
                        <Th>Status</Th>
                    </tr>
                </template>
                <template #tbody>
                    <Tr v-for="(record,index) in listData.data" v-bind:key="index" :row="record.uuid+'#'+index" :isSelected="isSelected(record.uuid+'#'+index)" :url="setup.settings.indexRoute+'/show/'+record.uuid">
                        <!-- <x-tabletd-checkbox v-if="isMultipleSelect" :item="record.uuid+'#'+listData.data.indexOf(record)" @onCheck="onCheck"/> -->
                        <!-- <TdCheckbox  :item="record.uuid+'#'+listData.data.indexOf(record)" @onCheck="onCheck"/> -->
                        <TdCheckbox :item="record.uuid+'#'+listData.data.indexOf(record)" @onCheck="onCheck"/>
                        <Td>{{record.name}} </Td> 
                        <Td>{{record.email}} </Td>
                        <Td>{{record.state}} </Td>
                        <Td>{{record.formatted_created_at}} </Td>
                        <Td>
                            <Badge :class="setup.statuses[setup.statuses.findIndex(x => x.id ==record.status)].color">{{setup.statuses[setup.statuses.findIndex(x => x.id ==record.status)].caption}}</Badge>
                        </Td>
                    </Tr>
                </template>
            </Table>
        </x-index-template>

    </div>
</template>


