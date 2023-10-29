import { TextCanvas } from "./TextCanvas";
import { startListeningToKeypress } from "./KeypressListener";

// TODO : Implement separate game business rules, where it then translates game info to text canvas and render
function render() {
    const textCanvas = new TextCanvas(33, 9);
    textCanvas.drawCharacter(16, 0, "O");
    console.log(textCanvas.paint());
}

async function main() {
    startListeningToKeypress();
}

main();