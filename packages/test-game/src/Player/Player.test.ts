import { Player } from "./Player";

describe("Player Test Suite", () => {
    it("can move Upwards", () => {
        const player = new Player();
        player.moveUp();

        expect(player.position).toEqual({ x: 0, y: 1 });
    })

    it("can move Downwards", () => {
        const player = new Player();
        player.moveDown();

        expect(player.position).toEqual({ x: 0, y: -1 });
    })

    it("can move Leftwards", () => {
        const player = new Player();
        player.moveLeft();

        expect(player.position).toEqual({ x: -1, y: 0 });
    })

    it("can move Rightwards", () => {
        const player = new Player();
        player.moveRight();

        expect(player.position).toEqual({ x: 1, y: 0 });
    })
})