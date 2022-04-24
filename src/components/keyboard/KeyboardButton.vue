<script setup lang="ts">
    import { isLetter } from '@/IsLetter';
import { gameState } from '@/PordleState';

    const props = defineProps(['keyboardKey'])
    function onVirtualKeyPress() {
        if (props.keyboardKey == "Delete") {
            gameState.handleBackspace();
        }
        else {
            gameState.submitKey(props.keyboardKey);
        }
    }
</script>

<template>
    <div class="keyboard-button" state="" @click="onVirtualKeyPress">
        {{props.keyboardKey}}
    </div>
</template>

<style>
    .keyboard-button {
        font-family: inherit;
        font-weight: bold;
        font-size: 12px;
        border: 0;
        padding: 0;
        margin: 0 6px 0 0;
        height: 58px;
        border-radius: 4px;
        cursor: pointer;
        user-select: none;
        background-color: var(--key-bg);
        color: var(--key-text-color);
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        text-transform: uppercase;
        -webkit-tap-highlight-color: rgba(0,0,0,0.3);
    }

    .keyboard-button[data-state='correct'] {
        background-color: var(--key-bg-correct);
        color: var(--key-evaluated-text-color);
    }

    .keyboard-button[data-state='present'] {
        background-color: var(--key-bg-present);
        color: var(--key-evaluated-text-color);
    }

    .keyboard-button[data-state='absent'] {
        background-color: var(--key-bg-absent);
        color: var(--key-evaluated-text-color);
    }
</style>