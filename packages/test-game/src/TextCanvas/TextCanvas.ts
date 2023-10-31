export class TextCanvas {
    private _properties: TextCanvasProperties;
    private _characterTable: string[][];

    constructor(width: number, height: number) {
        this._properties = new TextCanvasProperties(width, height);
        this._characterTable = this.generateEmptyCharacterTable();
    }

    public paint(): string {
        let text = "";

        text += this.paintTopBorder() + "\n";

        // Character array uses bottom left as origin point
        // But here we are adding the rows from top to bottom
        // So we add starting from the last row
        for (let y = this._properties.height - 1; y >= 0; y--)
            text += this.paintRow(y) + "\n";

        text += this.paintBottomBorder() + "\n";

        return text;
    }

    public drawCharacter(x: number, y: number, character: string): void {
        if (character.length > 1) throw new Error(`TextCanvas.drawCharacter: character ${character} is too long!`)

        if (x < 0 || x >= this._properties.width) return;
        if (y < 0 || y >= this._properties.height) return;

        this._characterTable[x][y] = character;
    }

    private generateEmptyCharacterTable(): string[][] {
        let emptyCharacterTable: string[][] = [];

        for (let x = 0; x < this._properties.width; x++) {
            emptyCharacterTable[x] = [];

            for (let y = 0; y < this._properties.height; y++) {
                emptyCharacterTable[x][y] = this._properties.backgroundCharacter;
            }
        }

        return emptyCharacterTable;
    }

    private paintTopBorder(): string {
        const topBorderLength = this._properties.width + 2 * this._properties.borderSize;

        let topBorder = "";
        for (let x = 0; x < topBorderLength; x++)
            topBorder += this._properties.topBorderCharacter;

        return topBorder;
    }

    private paintBottomBorder(): string {
        const bottomBorderLength = this._properties.width + 2 * this._properties.borderSize;

        let bottomBorder = "";
        for (let x = 0; x < bottomBorderLength; x++)
            bottomBorder += this._properties.bottomBorderCharacter;

        return bottomBorder;
    }

    private paintRow(y: number): string {
        let row = "";

        // Left border
        row += this._properties.sideBorderCharacter.repeat(this._properties.borderSize);

        // Content
        for (let x = 0; x < this._properties.width; x++) {
            row += this._characterTable[x][y];
        }

        // Right border
        row += this._properties.sideBorderCharacter.repeat(this._properties.borderSize);

        return row;
    }
}

class TextCanvasProperties {
    public get width(): number { return this._width; }
    public get height(): number { return this._height; }
    public get borderSize(): number { return this._borderSize; }
    public get topBorderCharacter(): string { return this._topBorderCharacter; }
    public get bottomBorderCharacter(): string { return this._bottomBorderCharacter; }
    public get sideBorderCharacter(): string { return this._sideBorderCharacter; }
    public get backgroundCharacter(): string { return this._backgroundCharacter; }

    private _width: number;
    private _height: number;
    private _borderSize: number;
    private _topBorderCharacter: string;
    private _bottomBorderCharacter: string;
    private _sideBorderCharacter: string;
    private _backgroundCharacter: string;

    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;

        this._borderSize = 1;
        this._topBorderCharacter = "=";
        this._bottomBorderCharacter = "=";
        this._sideBorderCharacter = "|";
        this._backgroundCharacter = " ";
    }
}