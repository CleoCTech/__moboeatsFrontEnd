<template>
    <div v-if="setup.settings !== undefined" class="flex gap-2 mb-1 max-h-6">
        <x-menu-bar-item :type="'link'" :href="this.setup.settings.listUrl === undefined? this.setup.settings.indexRoute:this.setup.settings.listUrl" :isDisabled="this.setup.pageType == 'list'? true:false" iconName="bars">List</x-menu-bar-item>
        <x-menu-bar-item :type="'link'" v-if="this.setup.settings.isCreate" :href="this.setup.settings.indexRoute+'/create'" :isDisabled="this.setup.pageType == 'create'? true:false" iconName="plus">New</x-menu-bar-item>
        <x-menu-bar-item :type="'link'" v-if="this.setup.settings.isView" :href="this.selected.length == 1? this.setup.settings.viewUrl === undefined? this.setup.settings.indexRoute+'/show/'+this.selected[0].split('#')[0]:this.setup.settings.viewUrl+'/'+this.selected[0].split('#')[0]:'#'" :isDisabled="this.setup.pageType != 'view' && this.selected.length == 1? false:true" iconName="eye">View</x-menu-bar-item>
        <x-menu-bar-item :type="'link'" v-if="this.setup.settings.isEdit" :href="this.selected.length == 1? this.setup.settings.indexRoute+'/edit/'+this.selected[0].split('#')[0]:'#'" :isDisabled="this.setup.pageType != 'edit' && this.selected.length == 1? false:true" iconName="pen">Edit</x-menu-bar-item>
        <x-menu-bar-item :type="'button'" v-if="this.setup.settings.isDelete" @click="destroy" :isDisabled="this.selected.length > 0? false:true" iconName="times">Delete</x-menu-bar-item>
        <x-menu-bar-item :type="'button'" @click="onAttachments" :isDisabled="this.setup.pageType != 'list' && this.setup.settings.isAttachments && this.selected.length == 1? false:true" iconName="paperclip">Attachments</x-menu-bar-item>
        <x-menu-bar-item :type="'button'" v-if="this.setup.pageType == 'list'"  @click="onMultipleSelect" iconName="check-circle">Multiselect</x-menu-bar-item>
        <x-input v-if="this.setup.pageType == 'list' && this.setup.settings.isSearch" v-model="searchKeyword" :modelValue="searchKeyword" v-on:keyup.enter="search" v-on:blur="search" placeholder="search" class="max-w-10 pyx-1 pxx-1 text-xs" style="max-width:150px;padding:2px"/>
        <x-menu-bar-item :type="'button'" v-if="this.setup.pageType == 'list' && this.setup.settings.isSearch" @click="onFilter" iconName="filter">Filter</x-menu-bar-item>
        <x-menu-bar-item :type="'button'" v-if="this.setup.pageType == 'list' && this.setup.settings.isExport" @click="onExport" iconName="file-export">Export</x-menu-bar-item>
    </div>
</template>
<script>
    import xButton from '@/components/Button.vue'
    import xLink from '@/components/Link.vue'
    import xMenuBarItem from '@/components/MenuBarItem.vue'
    import xInput from '@/components/Input.vue'
    // import { Inertia } from '@inertiajs/vue3'
    // import { router } from '@inertiajs/vue3'
    import { useRouter } from 'vue-router'
    import { notify } from "@kyvg/vue3-notification";

    export default {
        components:{xButton,xLink,xInput,useRouter,notify,xMenuBarItem},
        props:{
            setup:{default:Object},
            selected:{default:[]},
        },
        data(){
            return{
                searchKeyword:'',
                xData:{},
                isMultipleSelect:false,
                isFilter:false,
                isAttachments:false,
                router : useRouter()
            }
        },
        mounted(){
            this.getSearch();
            // console.log(this.selected);
        },
        methods:{
            search(){
                var self = this;
                var url = window.location.href;
                var currentSearch = '';
                if(!url.includes('?')){
                    url = url+'?search=';
                }else{
                    if(!url.includes('search=')){
                        url = url+'&search=';
                    }
                    //check existing search on url
                    var query = url.split('search=+');
                    if(typeof query[1] !== 'undefined' && query[1] !== ''){
                        var params = query[1].split("+");
                        if(params.length > 0){
                            for(var i=0; i<params.length;i++){
                                var set = params[i].split("=");
                                var search = {};
                                search.col = set[0];
                                search.val = set[1];
                                if(search.col != '' && search.col == 'all'){
                                    if(search.val != ''){
                                        currentSearch = search.val;
                                    }else{
                                        currentSearch = '*';
                                    }
                                }

                            }
                        }
                    }
                }
                if(currentSearch != ''){
                    if(currentSearch == '*'){
                        currentSearch = '';
                    }
                    url = url.replace('+all='+currentSearch,'+all='+this.searchKeyword);
                }else{
                    url = url+'+all='+this.searchKeyword;
                }
                router.visit(url, {
                    only: ['listData'],
                })
            },
            destroy(){
                if(this.selected.length > 0){
                    if(confirm("Do you really want to delete this record(s)?")){
                        this.selected.forEach((value,index)=>{
                            var self=this;
                            var id = value.split('#')[0];
                            var rowIndex = value.split('#')[1];
                                axios.delete(this.setup.settings.indexRoute+'/delete/'+id).then(response => {
                                    if(response.data = true){
                                        this.$notify({
                                            text:'Deleted Successfully',
                                            type:'success'
                                        });
                                        router.visit(this.setup.settings.indexRoute);
                                    }
                                }).catch((error) => {
                                    var errors = error.response.data;
                                    this.$notify({
                                        // text:usePage().props.value.errors.default,
                                        text:'Oops! Something went wrong',
                                        type:'error'
                                    });
                                })
                        });
                    }
                }

            },
            getSearch(){
                var url = window.location.href;
                if(url.includes('search=')){
                    var query = url.split('search=+');
                    if(typeof query[1] !== 'undefined' && query[1] !== ''){
                        var params = query[1].split("+");
                        if(params.length > 0){
                            for(var i=0; i<params.length;i++){
                                var set = params[i].split("=");
                                var search = {};
                                search.col = set[0];
                                search.val = set[1];
                                if(search.col != '' && search.col == 'all'){
                                    this.searchKeyword = search.val;
                                }
                            }
                        }
                    }
                }
            },
            onMultipleSelect(){
                this.isMultipleSelect = !this.isMultipleSelect;
                this.$emit('onMultipleSelect',this.isMultipleSelect);
            },
            onAttachments(){
                this.isAttachments = !this.isAttachments;
                this.$emit('onAttachments',this.isAttachments);
            },
            onFilter(){
                this.isFilter = !this.isFilter;
                this.$emit('onFilter',this.isFilter);
            },
            onExport(){
                this.$emit('onExport');
            }
        }
    }
</script>

