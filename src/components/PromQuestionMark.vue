<template>
    <div id="prom-question-mark" animation-state="none">
        ?
    </div>
</template>

<style>
    #prom-question-mark {
        width: 62.5px;
        height: 57.83px;
        font-size: 2rem;
        font-weight: bold;
        color: white;
        background-color: #811331;
        opacity: 0;
        display: flex;
        position: absolute;
        justify-content: center;
        align-items: center;
        bottom: 25%
    }

    #prom-question-mark[animation-state="prom-slide-in"] {
        animation-name: PromSlideIn;
        animation-duration: 1s;
        animation-fill-mode: forwards;
    }

    @keyframes PromSlideIn {
        to {
            opacity: 1;
        }
    }
</style>