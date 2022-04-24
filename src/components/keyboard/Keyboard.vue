<script setup lang="ts">
    import KeyboardRow from './KeyboardRow.vue';
    import KeyboardRowSpacerHalf from './KeyboardRowSpacerHalf.vue'
    import { ref } from 'vue'

    const keyboardRows = ref([
        { id: 1, numKeyboardKeys: 10, keyboardKeys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']},
        { id: 2, numKeyboardKeys: 9, keyboardKeys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']},
        { id: 3, numKeyboardKeys: 9, keyboardKeys: ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Delete']}
    ]);


</script>
 
<template>
    <div id="keyboard">
        <KeyboardRow
            :key="keyboardRows[0].id"
            :numKeyboardKeys="keyboardRows[0].numKeyboardKeys"
            :keyboardKeys="keyboardRows[0].keyboardKeys"
        />
        <KeyboardRowSpacerHalf
            :key="keyboardRows[1].id"
            :numKeyboardKeys="keyboardRows[1].numKeyboardKeys"
            :keyboardKeys="keyboardRows[1].keyboardKeys"
        />
        <KeyboardRow 
            :key="keyboardRows[2].id"
            :numKeyboardKeys="keyboardRows[2].numKeyboardKeys"
            :keyboardKeys="keyboardRows[2].keyboardKeys"
        />
    </div>
</template>

<style>
    #keyboard {
        margin: 0 8px;
        user-select: none;
        align-items: stretch;
    }
</style>