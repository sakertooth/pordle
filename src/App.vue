<script setup lang="ts">
    import GameContainer from './components/GameContainer.vue'
    import { onMounted } from 'vue';
    import { gameState } from './PordleState';
    
    function onKeyPress(event: KeyboardEvent): void {
        if (!gameState.gameWon && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
            gameState.submitKey(event.key);
        }
    }
    
    onMounted(() => window.addEventListener('keydown', onKeyPress));
</script>

<template>
    <GameContainer />
</template>

<style>
    
    body {
        background-color: rgb(56, 61, 105);
        font-family: Arial, Helvetica, sans-serif;
        transition: background-color 1s;
        height: 100%;
        overflow-y: hidden;
    }
   
</style>