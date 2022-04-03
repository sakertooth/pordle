<script setup lang="ts">
    import BoardContainer from './components/BoardContainer.vue'

    let currentRow = 0;
    let currentTile = -1;
    let currentWord = 'prom';

    function getRow(row: number) {
        return document.getElementById('board')?.children[row];
    }

    function getTile(row: number, tile: number) {
        return getRow(row)?.children[tile];
    }

    function getEvaluation(guess: string, word: string) {
        if (guess.length != word.length) {
            console.log('[ERROR] Mismatching lengths.');
            return;
        }

        
    }

    function isLetter(str: string) {
        return str.length === 1 && str.match(/[a-z]/i);
    }


    function onKeyPressed(event: KeyboardEvent): void {
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
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
            for (let tile = 0; tile < 4; tile++) {
                let currentTileHtml = getTile(currentRow, tile);
                setTimeout(() => currentTileHtml?.setAttribute('animation-state', 'flip-in'), 250 * tile);
                setTimeout(() => currentTileHtml?.setAttribute('animation-state', 'flip-out'), 250 * tile + 250);
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
        background-color: rgb(109, 119, 201);
        font-family: Arial, Helvetica, sans-serif;
    }

</style>