<script setup lang="ts">
    import ToastContainer from "./ToastContainer.vue";
    import BoardContainer from "./BoardContainer.vue";
    import PromQuestionMark from "./PromQuestionMark.vue"
</script>

<template>
    <div id="game-container">
        <ToastContainer />
        <PromQuestionMark />
        <BoardContainer />
    </div>
</template>

<style>
    #game-container {
        margin-top: 190px;
    }
</style>