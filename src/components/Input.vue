<template>
    <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :type="type" ref="input" class="shadow appearance-none border w-full py-2 px-2 leading-tight focus:outline-none focus:shadow-outline disabled:opacity-40"/>
</template>
<script>
    import { defineComponent } from 'vue'

    export default defineComponent({
        props: ['modelValue','type'],

        emits: ['update:modelValue'],

        methods: {
            focus() {
                this.$refs.input.focus()
            }
        }
    })
</script>
