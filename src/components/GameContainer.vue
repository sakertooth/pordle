<script setup lang="ts">
    import ToastContainer from "./ToastContainer.vue";
    import BoardContainer from "./BoardContainer.vue";
</script>

<template>
    <div id="game-container">
        <ToastContainer />
        <BoardContainer />
    </div>
</template>

<style>
    #game-container {
        margin-top: 190px;
    }
</style>