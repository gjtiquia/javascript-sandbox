import { TextCanvas } from "./TextCanvas";

function main() {
    const textCanvas = new TextCanvas(32, 9);
    console.log(textCanvas.paint());
}

main();