import { Player } from "./Player";

describe("Player Test Suite", () => {
    it("can move upwards", () => {
        const player = new Player();
        player.moveUp();

        expect(player.position).toEqual({ x: 0, y: 1 });
    })
})