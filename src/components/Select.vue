<template>
    <!-- class="cursor-pointer shadow appearance-none border w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:opacity-40" <select {{isset($id)? 'id = '.$id:''}}  {{ $attributes->merge(['class' => "cursor-pointer shadow appearance-none border w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:opacity-40"])}} {{!isset($required) || isset($required) && $required? 'required':''}}>{{$slot}}</select> -->
    <select :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" ref="select" 
    class="cursor-pointer bg-gray-700 text-gray-100 border-gray-600 focus:border-blue-600 focus:border-2 focus:border-gray-300 focus:ring focus:ring-gray-300 focus:ring-opacity-50 rounded-md shadow-sm"><slot></slot>
    </select>
</template>
<script>
    import { defineComponent } from 'vue'

    export default defineComponent({
        props: ['modelValue'],

        emits: ['update:modelValue'],

        methods: {
            focus() {
                this.$refs.select.focus()
            }
        }
    })
</script>
