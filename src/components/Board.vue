<script setup lang="ts">
    import BoardRow from './BoardRow.vue'
</script>

<template>
    <div id="board" animation-state="none">
        <BoardRow/>
        <BoardRow/>
        <BoardRow/>
        <BoardRow/>
        <BoardRow/>
        <BoardRow/>
    </div>
</template>

<style>
    #board {
        display: grid;
        width: 265px;
        height: 372px;
        grid-template-rows: repeat(6, 1fr);
        gap: 5px;
        box-sizing: border-box;
    }
</style>