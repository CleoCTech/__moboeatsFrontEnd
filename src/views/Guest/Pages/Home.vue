<script setup>
import { inject, onMounted } from 'vue';
import layouts from '@/views/Layouts/layouts';

const layout = inject('app:layout')
const change = () => {
    layout.value =layouts.BlankLayout
}

</script>

<template>
    <section class="home">
        <h1>Home</h1>

        <div class="box">
            <button class="button" @click="change">
                Change Layout
            </button>
        </div>
    </section>

</template>