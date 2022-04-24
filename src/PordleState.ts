import wordListRaw from '../assets/validWords.txt?raw'
import { isLetter } from './IsLetter';
import { reactive } from 'vue';

export class Pordle 
{
    currentRow: number;
    currentTile: number;
    correctWord: string; 
    wordList: string[];
    gameWon: boolean;

    constructor() {
        this.currentRow = 0;
        this.currentTile = -1;
        this.correctWord = 'prom';
        this.gameWon = false;
        this.wordList = wordListRaw.split('\n');
    }

    submitKey(key: string) {
        if (this.currentRow < 6) {
            if (isLetter(key) && this.currentTile < 3) {
                this.handleLetterPress(key);
            }
            else if (key == 'Backspace' && this.currentTile >= 0) {
                this.handleBackspace();
            }
            else if (key == 'Enter') {
               this.handleEnter();
            }
        }
    }

    handleLetterPress(letter: string) {
        let currentTileHtml = this.getTile(this.currentRow, ++this.currentTile);
        if (currentTileHtml == undefined) {
            console.log(`[ERROR] tile (${this.currentRow}, ${this.currentTile}) is undefined`);
            return;
        }

        currentTileHtml.textContent = letter.toUpperCase();
        currentTileHtml.setAttribute('animation-state', 'pop');
        currentTileHtml.setAttribute('tile-state', 'filled');

        let currentRowHtml = this.getRow(this.currentRow);
        if (currentRowHtml == undefined) {
            return;
        }

        currentRowHtml.setAttribute('word', `${currentRowHtml.getAttribute('word')}${letter}`);
    }

    handleBackspace() {

        if (this.currentTile < 0) {
            return;
        }
        let currentTileHtml = this.getTile(this.currentRow, this.currentTile--);
        if (currentTileHtml == undefined) {
            console.log(`[ERROR] tile (${this.currentRow}, ${this.currentTile}) is undefined`);
            return;
        }

        currentTileHtml.textContent = '';
        currentTileHtml.setAttribute('animation-state', 'pop-out');
        currentTileHtml.setAttribute('tile-state', 'empty');

        let currentRowHtml = this.getRow(this.currentRow);
        let currentRowWord = currentRowHtml?.getAttribute('word');
        currentRowHtml?.setAttribute('word', `${currentRowWord?.slice(0, currentRowWord.length - 1)}`);
    }

    handleEnter() {
        let currentRowHtml = this.getRow(this.currentRow);
        let currentRowWord = currentRowHtml?.getAttribute('word');
        if (currentRowWord == null) {
            return;
        }

        let wordTooShort = currentRowWord.length < 4;
        if (wordTooShort || !this.wordList.includes(currentRowWord)) {
            currentRowHtml?.setAttribute('animation-state', 'shake');
            setTimeout(() => currentRowHtml?.setAttribute('animation-state', 'none'), 1000);
            this.refreshToast(wordTooShort ? 'Not enough letters' : 'Not in word list');
        }
        else {   
            let evaluation = this.getEvaluation(currentRowWord, this.correctWord);
            this.fillTilesWithEvaluation(evaluation);

            if (evaluation.every(x => x == '🟩')) {
                this.gameWon = true;
                setTimeout(() => this.getRow(this.currentRow)?.setAttribute('animation-state', 'bounce'), 1250);

                //Color tiles with prom colors
                for (let tile = 0; tile < 4; ++tile) {
                    let fadeType = tile % 2 ? 'prom-fade-one' : 'prom-fade-two';
                    setTimeout(() => this.getRow(this.currentRow)?.children[tile].setAttribute('animation-state', fadeType), 2250 + 100 * tile);
                }

                //Fade other rows, bring current row to center of page, and slide in question mark 
                let boardHtml = (document.getElementById('board') as HTMLElement);
                setTimeout(() => {
                    for (let row = 0; row < 6; ++row) {
                        if (row == this.currentRow) {
                            continue;
                        }
                        boardHtml.children[row].setAttribute('animation-state', 'fade-out');
                    }

                    (boardHtml.children[this.currentRow] as HTMLElement).style.setProperty('--pxshift', (2 - this.currentRow) * 62 + "px");
                    boardHtml.children[this.currentRow].setAttribute('animation-state', 'bring-to-center');

                    let promQuestionMarkHtml = (document.getElementById('prom-question-mark') as HTMLElement);
                    promQuestionMarkHtml.setAttribute('animation-state', 'prom-slide-in');

                    document.body.style.backgroundColor = 'rgb(48, 25, 52)';
                }, 2250 + 800);
            }
            else {
                this.currentRow++;
                this.currentTile = -1;
            }

        }
    }

    fillTilesWithEvaluation(evaluation: Array<string>) {
        for (let tile = 0; tile < 4; tile++) {
            let currentTileHtml = this.getTile(this.currentRow, tile);
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

    refreshToast(message: string) {
        let toastContainerHtml = document.getElementById('toast-container');
        if (toastContainerHtml == null) {
            return;
        }
    
        let toastHtml = toastContainerHtml.children[0] as HTMLElement;
        toastHtml.textContent = message;
    
        toastHtml.style.animation = 'none';
        toastHtml.offsetHeight; //DOM Reflow
        toastHtml.style.animation = '';
        toastHtml.setAttribute('animation-state', 'fade');
    }

    getEvaluation(guess: string, word: string) {
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

    getRow(row: number) {
        return document.getElementById('board')?.children[row];
    }

    getTile(row: number, tile: number) {
        return this.getRow(row)?.children[tile];
    }

}

export let gameState = reactive(new Pordle());