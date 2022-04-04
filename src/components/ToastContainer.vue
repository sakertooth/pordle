<script setup lang="ts">
    import Toast from './Toast.vue'
</script>

<template>
    <div id='toast-container'>
        <Toast />
    </div>
</template>

<style>
    #toast-container {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        padding-bottom: 25px;
    }
</style>