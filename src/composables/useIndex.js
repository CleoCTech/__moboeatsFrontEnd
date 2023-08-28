import { ref, watch } from 'vue';

//components

import xIndexTemplate from '@/views/Layouts/Templates/CRUD/Index.vue'

//Mosaic Components
import ThCheckbox from '@/components/Table/ThCheckbox.vue'; 
import TdCheckbox from '@/components/Table/TdCheckbox.vue'; 
import Th from '@/components/Table/Th.vue'; 
import Td from '@/components/Table/Td.vue'; 
import Tr from '@/components/Table/Tr.vue'; 
import Table from '@/components/Table/Table.vue'

export const indexProps = {
    setup:Object,
    listData:Object,
}

const selected = ref([]);
const isMultipleSelect = ref(false);

const selectedItems = ref([]);
const selectedItemsMap  = ref([]);

export const useIndex = (props) => {
    
    function onCheck(item){
        if(selected.value.indexOf(item) === -1){
            selected.value.push(item);
        }else{
            selected.value.splice(selected.value.indexOf(item),1);
        }
    }
    function handleToggleSelectAll(value) {
        if (value) {
            // Select all items
            selectAll.value = !selectAll.value;
            emits('toggle-select-all', selectAll.value);
        } else {
            // Deselect all items
            selectedItems.value = [];
        }
    }
    function onRowClick(item){
        selected.value = [];
        selected.value.push(item);
    }
    function isSelected(item){
        // return selected.value.indexOf(item) === -1
        if(selected.value.indexOf(item) === -1){
            return false;
        }else{
            return true;
        }
    }

    function destroy(data){
        if(selected.value.length > 0){
            if(confirm("Do you really want to delete this record(s)?")){
                console.log('Deleting selected...');
            }
        } else{
            console.log('length : 0');
        }
    }
    watch(isMultipleSelect, (newV, oldV) => {
        if(newV == false){
            selected.value = [];
        }
    });

    return {
        onCheck, 
        onRowClick,
        isSelected,
        xIndexTemplate,
        selected,
        isMultipleSelect,
        destroy,

        ThCheckbox,
        TdCheckbox,
        selectedItemsMap,
        selectedItems,
        handleToggleSelectAll,
        Th,
        Td,
        Tr,
        Table
    }
}