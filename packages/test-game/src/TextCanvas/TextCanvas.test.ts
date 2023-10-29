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

    it("should draw a point that is within the bounds", () => {
        const textCanvas = new TextCanvas(4, 3);
        textCanvas.drawCharacter(2, 2, "x");
        const output = textCanvas.paint();

        const expectedOutput =
            "======\n" +
            "|  x |\n" +
            "|    |\n" +
            "|    |\n" +
            "======\n";

        expect(output).toEqual(expectedOutput);
    })

    it("should ignore a point that is out of bounds", () => {
        const textCanvas = new TextCanvas(4, 3);
        textCanvas.drawCharacter(10, 10, "x");
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