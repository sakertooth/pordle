<script setup lang="ts">
    import BoardRow from './BoardRow.vue'
</script>

<template>
    <div id="board" animation-state="none">
        <BoardRow v-for="i in 6"/>
    </div>
</template>

<style>
    #board {
        display: grid;
        position: relative;
        width: 290px;
        height: 400px;
        grid-template-rows: repeat(6, 1fr);
        gap: 5px;
        padding: 10px;
        box-sizing: border-box;
    }
</style>