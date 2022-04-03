export class PordleGame {
    private currentRow: number;
    private currentTile: number;
    private correctWord: string;
    private keyFired: boolean;
    
    constructor() {
        this.currentRow = 0;
        this.currentTile = 0;
        this.correctWord = 'prom';
        this.keyFired = false;
    }

    attachEvents(): void {
        document.addEventListener('keydown', this.onKeyPressed);
        document.addEventListener('keyup', this.onKeyUp);
    }

    getRow(row: number) {
        return document.getElementById('board')?.children[row];
    }

    getTile(row: number, tile: number) {
        return this.getRow(row)?.children[tile];
    }

    onKeyPressed(event: KeyboardEvent): void {
        if (this.keyFired || !((event.key >= 'a' && event.key <= 'z')) || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
            return;
        }
        this.getRow(3);
        console.log(event.key);

        this.keyFired = true;
    }

    onKeyUp(event: KeyboardEvent): void {
        this.keyFired = false;
    }
}