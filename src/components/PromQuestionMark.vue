<script setup lang="ts">
    import BoardTile from './BoardTile.vue'
</script>

<template>
    <div class="prom-question-mark">
        ?
    </div>
</template>

<style>
    .prom-question-mark {
        width: 57.5px;
        height: 54.5px;
        box-sizing: border-box;
        align-items: center;
        vertical-align: middle;
        font-size: 2rem;
        justify-content: center;
        display: inline-flex;
        font-weight: bold;
        border: 2px solid var(--color-tone-4);
        color: white;
    }
</style>