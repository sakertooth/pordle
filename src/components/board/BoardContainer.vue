<script setup lang="ts">
    import Board from './Board.vue'
    import PromQuestionMark from "../PromQuestionMark.vue"
</script>

<template>
    <div id="board-container">
        <Board />
        <PromQuestionMark />
    </div>
</template>

<style>
    #board-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        overflow: hidden;
    }
</style>