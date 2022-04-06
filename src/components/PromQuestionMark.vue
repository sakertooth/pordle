<script setup lang="ts">
    import BoardTile from './BoardTile.vue'
</script>

<template>
    <div id="prom-question-mark" animation-state="none">
        ?
    </div>
</template>

<style>
    #prom-question-mark {
        width: 62.5px;
        height: 57.83px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        font-weight: bold;
        color: white;
        background-color: #811331;
        float: right;
        opacity: 0;
        margin-top: calc(2 * 62px);
    }

    #prom-question-mark[animation-state="prom-slide-in"] {
        animation-name: PromSlideIn;
        animation-duration: 1s;
        animation-fill-mode: forwards;
    }

    @keyframes PromSlideIn {
        to {
            opacity: 1;
            transform: translateX(-625px);
        }
    }
</style>