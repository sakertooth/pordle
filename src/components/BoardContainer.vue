<script setup lang="ts">
    import Board from './Board.vue'
</script>

<template>
    <div id="board-container">
        <Board />
    </div>
</template>

<style>
    #board-container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 150px;
    }
</style>