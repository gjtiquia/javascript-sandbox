export class TextCanvas {
    private _width: number;
    private _height: number;
    private _borderSize: number;
    private _topBorderCharacter: string;
    private _bottomBorderCharacter: string;
    private _sideBorderCharacter: string;

    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;

        this._borderSize = 1;
        this._topBorderCharacter = "=";
        this._bottomBorderCharacter = "=";
        this._sideBorderCharacter = "|";
    }

    public paint(): string {
        let text = "";

        text += this.paintTopBorder() + "\n";

        for (let x = 0; x < this._height; x++)
            text += this.paintRow() + "\n";

        text += this.paintBottomBorder() + "\n";

        return text;
    }

    private paintTopBorder(): string {
        const topBorderLength = this._width + 2 * this._borderSize;

        let topBorder = "";
        for (let x = 0; x < topBorderLength; x++)
            topBorder += this._topBorderCharacter;

        return topBorder;
    }

    private paintBottomBorder(): string {
        const bottomBorderLength = this._width + 2 * this._borderSize;

        let bottomBorder = "";
        for (let x = 0; x < bottomBorderLength; x++)
            bottomBorder += this._bottomBorderCharacter;

        return bottomBorder;
    }

    private paintRow(): string {
        let row = "";

        // Left border
        row += this._sideBorderCharacter.repeat(this._borderSize);

        // Center content
        for (let x = 0; x < this._width; x++)
            row += " ";

        // Right border
        row += this._sideBorderCharacter.repeat(this._borderSize);

        return row;
    }
}