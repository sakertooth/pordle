<script setup lang="ts">
    import ToastContainer from "./toast/ToastContainer.vue";
    import BoardContainer from "./board/BoardContainer.vue";
    import Keyboard from "./keyboard/Keyboard.vue"
</script>

<template>
    <div id="game-container">
        <ToastContainer />
        <BoardContainer />
        <Keyboard />
    </div>
</template>

<style>
    #game-container {
        width: 100%;
        max-width: var(--game-max-width);
        height: calc(100% - var(--header-height));
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>