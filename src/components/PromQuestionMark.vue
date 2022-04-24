<template>
    <div id="prom-question-mark-container">
        <div id="prom-question-mark" animation-state="none">
            ?
        </div>
    </div>
</template>

<style>

    #prom-question-mark-container {
        display: flex;
        padding-bottom: calc(59.17px + 5px);
    }

    #prom-question-mark {
        width: 63.75px;
        height: 59.17px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        font-weight: bold;
        vertical-align: middle;
        box-sizing: border-box;
        color: white;
        background-color: #811331;
        opacity: 0;
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