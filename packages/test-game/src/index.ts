import { TextCanvas } from "./TextCanvas";

function main() {
    const textCanvas = new TextCanvas(33, 9);
    textCanvas.drawCharacter(16, 0, "O");

    console.log(textCanvas.paint());
}

main();