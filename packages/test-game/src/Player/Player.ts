import { Vector2 } from "../Vector2";

export class Player {
    public position: Vector2;

    constructor() {
        this.position = { x: 0, y: 0 }
    }

    public moveUp(): void {
        this.position.y++;
    }
}