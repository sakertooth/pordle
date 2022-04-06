<script setup lang="ts">
    import BoardTile from './BoardTile.vue'
</script>

<template>
    <div class="board-row" word="" animation-state="none">
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

    .board-row[animation-state="shake"] {
      animation-name: Shake;
      animation-duration: 600ms;
    }

    .board-row[animation-state="bounce"] {
      animation-name: Bounce;
      animation-duration: 1000ms;
    }

    @keyframes Shake {
      10%,
      90% {
        transform: translateX(-1px);
      }

      20%,
      80% {
        transform: translateX(2px);
      }

      30%,
      50%,
      70% {
        transform: translateX(-4px);
      }

      40%,
      60% {
        transform: translateX(4px);
      }
    }

    @keyframes Bounce {
      0%, 20% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-30px);
      }
      50% {
        transform: translateY(5px);
      }
      60% {
        transform: translateY(-15px);
      }
      80% {
        transform: translateY(2px);
      }
      100% {
        transform: translateY(0);
      }
    }

    .board-row[animation-state="fade-out"] {
      animation-name: FadeOut;
      animation-duration: 750ms;
      animation-fill-mode: forwards;
    }

    @keyframes FadeOut {
      to {
        opacity: 0;
      }
    }

    .board-row[animation-state="bring-to-center"] {
      animation-name: BringToCenter;
      animation-duration: 1s;
      animation-fill-mode: forwards;
    }

    @keyframes BringToCenter {
      to {
        transform: translateY(var(--pxshift));
      }
    }
</style>