<script setup lang="ts">

</script>

<template>
    <div class="board-tile" tile-state="empty" animation-state="none"></div>
</template>

<style>
    @import '../../assets/styles/pordle.css';

    .board-tile {
        width: 100%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        font-weight: bold;
        vertical-align: middle;
        box-sizing: border-box;
    }

    .board-tile[tile-state='empty'] {
        border: 2px solid var(--color-tone-4);
    }

    .board-tile[tile-state='filled'] {
        border: 2px solid var(--color-tone-3);
        color: white;
    }

    .board-tile[tile-state='correct'] {
        background-color: var(--color-correct);
        color: white;
    }

    .board-tile[tile-state='present'] {
        background-color: var(--color-present);
        color: white;
    }

    .board-tile[tile-state='absent'] {
        background-color: var(--color-absent);
        color: white;
    }


    .board-tile[animation-state='pop'] {
        animation-name: Pop;
        animation-duration: 100ms;
    }

    .board-tile[animation-state='pop-out'] {
        animation-name: PopOut;
        animation-duration: 100ms;
        animation-direction: reverse;
    }

    .board-tile[animation-state='flip-in'] {
        animation-name: FlipIn;
        animation-duration: 250ms;
        animation-timing-function: ease-in;
    }

    .board-tile[animation-state='flip-out'] {
        animation-name: FlipOut;
        animation-duration: 250ms;
        animation-timing-function: ease-in;
    }


    @keyframes Pop {
        from {
            transform: scale(0.8);
            opacity: 0;
        }

        40% {
            transform: scale(1.1);
            opacity: 1;
        }
    }

    @keyframes PopOut {
        from {
            transform: scale(0.8);
            opacity: 0;
        }

        40% {
            transform: scale(1.1);
            opacity: 1;
        }
    }

    @keyframes FlipIn {
        0% {
            transform: rotateX(0);
        }

        100% {
            transform: rotateX(-90deg);
        }
    }

    @keyframes FlipOut {
        0% {
            transform: rotateX(-90deg);
        }

        100% {
            transform: rotateX(0);
        }
    }

</style>