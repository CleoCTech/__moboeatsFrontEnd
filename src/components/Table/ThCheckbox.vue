<template>
    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div class="flex items-center">
            <label class="inline-flex">
            <span class="sr-only">Select all</span>
            <input class="form-checkbox" type="checkbox" v-model="selectAll" @click="toggleSelectAll" />
            </label>
        </div>
    </th>
</template>
<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const { selectedItems } = defineProps(['selectedItems']);
const emits = defineEmits();

const selectAll = ref(false);

const toggleSelectAll = () => {
  selectAll.value = !selectAll.value;
  emits('toggle-select-all', selectAll.value);
};

</script>