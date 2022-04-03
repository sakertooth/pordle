<script setup lang="ts">
    import BoardContainer from './components/BoardContainer.vue'

    let currentRow = 0;
    let currentTile = -1;
    let correctWord = 'prom';
    let gameOver = false;

    function getRow(row: number) {
        return document.getElementById('board')?.children[row];
    }

    function getTile(row: number, tile: number) {
        return getRow(row)?.children[tile];
    }

    function charCount(str: string, target: string) {
        if (target.length != 1) {
            return;
        }

        let count = 0;
        for (let i = 0; i < str.length; ++i) {
            if (str.charAt(i) == target) {
                ++count;
            }
        }

        return count;
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

    function onKeyPressed(event: KeyboardEvent): void {
        if (gameOver || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
            return;
        }

        if (isLetter(event.key) && currentTile < 3) {
            let currentTileHtml = getTile(currentRow, ++currentTile);
            if (currentTileHtml == undefined) {
                console.log(`[ERROR] tile (${currentRow}, ${currentTile}) is undefined`);
                return;
            }
    
            currentTileHtml.textContent = event.key.toUpperCase();
            currentTileHtml.setAttribute('animation-state', 'pop');
            currentTileHtml.setAttribute('tile-state', 'filled');

            let currentRowHtml = getRow(currentRow);
            if (currentRowHtml == undefined) {
                return;
            }

            currentRowHtml.setAttribute('word', `${currentRowHtml.getAttribute('word')}${event.key}`);
        }

        if (event.key == 'Backspace' && currentTile >= 0 && currentRow < 6) {
            let currentTileHtml = getTile(currentRow, currentTile--);
            if (currentTileHtml == undefined) {
                console.log(`[ERROR] tile (${currentRow}, ${currentTile}) is undefined`);
                return;
            }

            currentTileHtml.textContent = '';
            currentTileHtml.setAttribute('animation-state', 'pop-out');
            currentTileHtml.setAttribute('tile-state', 'empty');

            let currentRowHtml = getRow(currentRow);
            if (currentRowHtml == undefined) {
                return;
            }

            let currentRowWord = currentRowHtml.getAttribute('word');
            currentRowHtml.setAttribute('word', `${currentRowWord?.slice(0, currentRowWord.length - 1)}`);            
        }
        
        if (event.key == 'Enter' && currentTile == 3 && currentRow < 6) {

            let currentRowWord = getRow(currentRow)?.getAttribute('word');
            if (currentRowWord == null) {
                return;
            }

            let evaluation = getEvaluation(currentRowWord, correctWord);
            if (evaluation.every(x => x == '🟩')) {
                gameOver = true;
            }

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

            currentRow++;
            currentTile = -1;
        }
    }

    document.addEventListener('keydown', onKeyPressed);
</script>

<template>
    <BoardContainer />
</template>

<style>
    body 
    {
        background-color: rgb(56, 61, 105);
        font-family: Arial, Helvetica, sans-serif;
    }

</style>