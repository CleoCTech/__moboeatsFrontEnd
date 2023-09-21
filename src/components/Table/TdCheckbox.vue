<template>
   <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
      <div class="flex items-center">
        <label class="inline-flex">
          <span class="sr-only">Select</span>
          <!-- <input
            type="checkbox"
            class="form-checkbox"
            :checked="isChecked"
            @change="onCheckboxChange"
          /> -->
          <Checkbox @click="onCheck()" :checked="$parent.isSelected? true : false" />

        </label>
      </div>
    </td>
</template>

<script setup>
import { ref, watch, defineEmits, computed } from 'vue';
import Checkbox from '@/Components/Checkbox.vue'

const props = defineProps({
  item: String, 
});

const emits = defineEmits(['onCheck']);

const onCheck = () => {
  emits('onCheck', props.item);
};

const onTdClick = (event) => {
  event.stopPropagation();
};

</script>
