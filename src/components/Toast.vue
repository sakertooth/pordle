<template>
    <div class="toast" animation-state="none"></div>
</template>

<style>
    .toast {
        margin: 8px;
        background-color: var(--color-tone-1);
        color: var(--color-tone-7);
        padding: 16px;
        border-radius: 4px;
        font-weight: 700;
        opacity: 0;
        border: none;
        width: fit-content;
        justify-content: center;
        align-items: center;
        position: absolute;
    }
    .toast[animation-state='fade'] {
        animation-name: Fade;
        animation-duration: 1000ms;
        animation-delay: 1s;
        animation-fill-mode: forwards;
        opacity: 1;
    }


    @keyframes Fade {
        0% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }
</style>