import { TextCanvas } from "./TextCanvas";

describe("TextCanvas Test Suite", () => {
    it("should create an empty TextCanvas", () => {
        const textCanvas = new TextCanvas(4, 3);
        const output = textCanvas.paint();

        const expectedOutput =
            "======\n" +
            "|    |\n" +
            "|    |\n" +
            "|    |\n" +
            "======\n";

        expect(output).toEqual(expectedOutput);
    })
})