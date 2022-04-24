<script setup lang="ts">
    import KeyboardButton from "./KeyboardButton.vue";
    const props = defineProps(['numKeyboardKeys', 'keyboardKeys']);
</script>

<template>
    <div class="keyboard-row">
        <KeyboardButton v-for="i in props.numKeyboardKeys"
            :keyboardKey="props.keyboardKeys[i - 1]"
        />
    </div>
</template>

<style>
    .keyboard-row {
        display: flex;
        width: 100%;
        margin: 0 auto 8px;
        touch-action: manipulation;
    }
</style>
