<template>
    <div class="flex flex-col gap-2 text-xs" v-if="isFilter">
        <div v-if="filters.length > 0">
            <div v-for="(ft,index) in filters" :key="index" class="flex gap-1">
                <span @click="removeFilter(filters.indexOf(ft))" class="cursor-pointer">X</span> {{ft.col}} {{ft.val}}
            </div>
        </div>
        <x-select v-model="filter.column" @change="onColumnChange" class="text-xs">
            <option value="">--filter by--</option>
            <option v-for="(column,index) in columns" :key="index" :value="column.name">{{column.name}}</option>
        </x-select>
        <x-input v-if="filter.element == 'input' || filter.element == 'textarea'" v-model="filter.value" :type="filter.dataType" class="w-full text-xs"/>
        <x-button v-if="filter.column != ''" @click="addFilter" class="bg-gray-800">Add Filter</x-button>
        <span @click="clearFilter" class="cursor-pointer">Clear Filters</span>
    </div>
</template>
<script>
    import xSelect from '@/components/Select.vue'
    import xInput from '@/components/Input.vue'
    import xButton from '@/components/Button.vue'
    import { useRouter } from 'vue-router'
    export default{
        components:{xSelect,xInput,xButton},
        props:{columns:Object},
        data(){
            return{
                filter:{
                    column:'',
                    dataType:'',
                    element:'',
                    value:'',
                },
                filters : [],
                isFilter:false,
                router : useRouter(),
            }
        },
        mounted(){
            this.getFilters();
        },
        methods:{
            onColumnChange(){
                let index = this.columns.findIndex((item) => item.name === this.filter.column);
                if(index != -1){
                    this.filter.column = this.columns[index]['name'];
                    this.filter.dataType = this.columns[index]['dataType'];
                    this.filter.element = this.columns[index]['element'];
                }
            },
            addFilter(){
                var newFilter = {};
                newFilter.col = this.filter.column;
                newFilter.type = this.filter.dataType;
                newFilter.el = this.filter.element;
                newFilter.val = this.filter.value;
                this.filters.push(newFilter);
                this.filter.column = '';
                this.filter.dataType = '';
                this.filter.element = '';
                this.filter.value = '';
                this.updateRoute();
            },
            removeFilter(index){
                var url = window.location.href;
                url = url.replace('+'+this.filters[index].col+'='+this.filters[index].val,'');
                this.filters.splice(index,1);
                router.visit(url, {
                    only: ['listData'],
                })
            },
            clearFilter(){
                var url = window.location.href;
                var query = url.split('?search=+');
                url = url.replace('?search='+query[1],'');
                this.filters = {};
                router.visit(url, {
                    only: ['listData'],
                })
            },
            updateRoute(){
                var query = '';
                var url = window.location.href;
                for(var i=0;i<this.filters.length;i++){
                    if(!url.includes('?')){
                        url = url+'?search=';
                    }
                    query = query + '+'+this.filters[i].col+'='+this.filters[i].val;
                }
                url = url+query;
                router.visit(url, {
                    only: ['listData'],
                })
            },
            getFilters(){
                var url = window.location.href;
                if(url.includes('?search=')){
                    var query = url.split('search=+');
                    if(typeof query[1] !== 'undefined' && query[1] !== ''){
                        var params = query[1].split("+");
                        if(params.length > 0){
                            for(var i=0; i<params.length;i++){
                                var set = params[i].split("=");
                                var newFilter = {};
                                newFilter.col = set[0];
                                newFilter.val = set[1];
                                if(newFilter.col != '' && newFilter.col != 'all'){
                                    this.filters.push(newFilter);
                                    this.isFilter = true;
                                }else{
                                    this.isFilter = false;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</script>
