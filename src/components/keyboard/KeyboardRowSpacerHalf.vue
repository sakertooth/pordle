<script setup lang="ts">
    import KeyboardButton from "./KeyboardButton.vue";
    const props = defineProps(['numKeyboardKeys', 'keyboardKeys']);
</script>

<template>
    <div class="keyboard-row">
        <div class="spacer-half"></div>
            <KeyboardButton 
                ref="keyboardButton" 
                v-for="i in props.numKeyboardKeys"
                :keyboardKey="props.keyboardKeys[i - 1]"
            />
        <div class="spacer-half"></div> 
    </div>
</template>

<style>
    .spacer-half {
        flex: 0.5;
    }
</style>