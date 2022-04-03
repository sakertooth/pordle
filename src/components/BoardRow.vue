<script setup lang="ts">
    import BoardTile from './BoardTile.vue'
</script>

<template>
    <div class="board-row" word="">
        <BoardTile />
        <BoardTile />
        <BoardTile />
        <BoardTile />
    </div>
</template>

<style>
    .board-row {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 5px;
    }
</style>