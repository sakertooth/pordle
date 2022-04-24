<script setup lang="ts">
    import Board from './Board.vue'
import PromQuestionMark from '../PromQuestionMark.vue'
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
        margin-left: 63.75px;
        align-items: center;
        flex-grow: 1;
    }
</style>