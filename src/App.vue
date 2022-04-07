<script setup lang="ts">
    import GameContainer from './components/GameContainer.vue'
    import wordListRaw from '../assets/validWords.txt?raw'
    import { onMounted } from 'vue';
    import { refreshToast } from './refreshtoast'

    let currentRow = 0;
    let currentTile = -1;
    let correctWord = 'prom';
    let gameWon = false;
    let wordList = wordListRaw.split('\n');

    function getRow(row: number) {
        return document.getElementById('board')?.children[row];
    }

    function getTile(row: number, tile: number) {
        return getRow(row)?.children[tile];
    }

    function getEvaluation(guess: string, word: string) {
        let evaluation = Array(4).fill('⬜');
        let wordLetterPool = [...word];

        for (let letterIndex = 0; letterIndex < 4; letterIndex++) {
            if (guess[letterIndex] == wordLetterPool[letterIndex]) {
                evaluation[letterIndex] = '🟩';
                wordLetterPool[letterIndex] = '';
            }
            else if (wordLetterPool.includes(guess[letterIndex])) {
                evaluation[letterIndex] = '🟨';
                wordLetterPool[wordLetterPool.indexOf(guess[letterIndex])] = '';
            }
        }

        return evaluation;
    }

    function isLetter(str: string) {
        return str.length === 1 && str.match(/[a-z]/i);
    }

    function handleLetterPress(letter: string) {
        let currentTileHtml = getTile(currentRow, ++currentTile);
        if (currentTileHtml == undefined) {
            console.log(`[ERROR] tile (${currentRow}, ${currentTile}) is undefined`);
            return;
        }

        currentTileHtml.textContent = letter.toUpperCase();
        currentTileHtml.setAttribute('animation-state', 'pop');
        currentTileHtml.setAttribute('tile-state', 'filled');

        let currentRowHtml = getRow(currentRow);
        if (currentRowHtml == undefined) {
            return;
        }

        currentRowHtml.setAttribute('word', `${currentRowHtml.getAttribute('word')}${letter}`);
    }

    function handleBackspace() {
        let currentTileHtml = getTile(currentRow, currentTile--);
        if (currentTileHtml == undefined) {
            console.log(`[ERROR] tile (${currentRow}, ${currentTile}) is undefined`);
            return;
        }

        currentTileHtml.textContent = '';
        currentTileHtml.setAttribute('animation-state', 'pop-out');
        currentTileHtml.setAttribute('tile-state', 'empty');

        let currentRowHtml = getRow(currentRow);
        let currentRowWord = currentRowHtml?.getAttribute('word');
        currentRowHtml?.setAttribute('word', `${currentRowWord?.slice(0, currentRowWord.length - 1)}`);
    }

    function handleEnter() {
        let currentRowHtml = getRow(currentRow);
        let currentRowWord = currentRowHtml?.getAttribute('word');
        if (currentRowWord == null) {
            return;
        }

        let wordTooShort = currentRowWord.length < 4;
        if (wordTooShort || !wordList.includes(currentRowWord)) {
            currentRowHtml?.setAttribute('animation-state', 'shake');
            setTimeout(() => currentRowHtml?.setAttribute('animation-state', 'none'), 1000);
            refreshToast(wordTooShort ? 'Not enough letters' : 'Not in word list');
        }
        else {   
            let evaluation = getEvaluation(currentRowWord, correctWord);
            fillTilesWithEvaluation(evaluation);

            if (evaluation.every(x => x == '🟩')) {
                gameWon = true;
                setTimeout(() => getRow(currentRow)?.setAttribute('animation-state', 'bounce'), 1250);

                //Color tiles with prom colors
                for (let tile = 0; tile < 4; ++tile) {
                    let fadeType = tile % 2 ? 'prom-fade-one' : 'prom-fade-two';
                    setTimeout(() => getRow(currentRow)?.children[tile].setAttribute('animation-state', fadeType), 2250 + 100 * tile);
                }

                //Fade other rows, bring current row to center of page, and slide in question mark 
                let boardHtml = (document.getElementById('board') as HTMLElement);
                setTimeout(() => {
                    for (let row = 0; row < 6; ++row) {
                        if (row == currentRow) {
                            continue;
                        }
                        boardHtml.children[row].setAttribute('animation-state', 'fade-out');
                    }

                    (boardHtml.children[currentRow] as HTMLElement).style.setProperty('--pxshift', (2 - currentRow) * 62 + "px");
                    boardHtml.children[currentRow].setAttribute('animation-state', 'bring-to-center');

                    let promQuestionMarkHtml = (document.getElementById('prom-question-mark') as HTMLElement);
                    promQuestionMarkHtml.setAttribute('animation-state', 'prom-slide-in');

                    document.body.style.backgroundColor = 'rgb(48, 25, 52)';
                }, 2250 + 800);
            }
            else {
                currentRow++;
                currentTile = -1;
            }

        }
    }

    function fillTilesWithEvaluation(evaluation: Array<string>) {
        for (let tile = 0; tile < 4; tile++) {
            let currentTileHtml = getTile(currentRow, tile);
            setTimeout(() => currentTileHtml?.setAttribute('animation-state', 'flip-in'), 250 * tile);
            setTimeout(() => {
                currentTileHtml?.setAttribute('animation-state', 'flip-out');

                switch (evaluation[tile]) {
                    case '🟩':
                        currentTileHtml?.setAttribute('tile-state', 'correct');
                        break;
                    case '🟨':
                        currentTileHtml?.setAttribute('tile-state', 'present');
                        break;
                    case '⬜':
                        currentTileHtml?.setAttribute('tile-state', 'absent');
                        break;
                }
            }, 250 * tile + 250);
        }
    }

    function onKeyPressed(event: KeyboardEvent): void {
        if (gameWon || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
            return;
        }

        if (currentRow < 6) {
            if (isLetter(event.key) && currentTile < 3) {
                handleLetterPress(event.key);
            }
            else if (event.key == 'Backspace' && currentTile >= 0) {
                handleBackspace();
            }
            else if (event.key == 'Enter') {
               handleEnter();
            }
        }
    }

    onMounted(() => document.addEventListener('keydown', onKeyPressed));
</script>

<template>
    <GameContainer />
</template>

<style>
    body {
        background-color: rgb(56, 61, 105);
        font-family: Arial, Helvetica, sans-serif;
        transition: background-color 1s;
    }
</style>