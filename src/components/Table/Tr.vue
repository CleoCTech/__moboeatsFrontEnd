<template>
   <tr class=""
   
    @click="onclick"
    @dblclick="onDblClick"
   >
        <slot></slot>
   </tr>
</template>

<script setup>
import { ref, onMounted, inject, defineEmits   } from 'vue';
import { router } from '@inertiajs/vue3'

const props = defineProps({
  row: { default: 0 },
  url: { default: '' },
  isSelected: { default: false }
});

const rowNo = ref(0);
const recordId = ref(0);
const emits = defineEmits(['onRowClick']);

onMounted(() => {
  const rowKeys = props.row.split('#');
  recordId.value = rowKeys[0];
  rowNo.value = rowKeys[1];
});

const onclick = () => {
  
  if (props.url !== '') {
    emits('onRowClick', recordId.value);
  }
};

const onDblClick = () => {
  if (props.url !== '') {
   router.visit(props.url);
  }
};

</script>