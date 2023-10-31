import { TextCanvas } from "./TextCanvas";
import { startListeningToKeypressEvents } from "./KeypressListener";

// TODO : Implement separate game business rules, where it then translates game info to text canvas and render
function render() {
    const textCanvas = new TextCanvas(33, 9);
    textCanvas.drawCharacter(16, 4, "K");
    console.log(textCanvas.paint());
}

function main() {
    render();

    const keypressEvents = startListeningToKeypressEvents();
    keypressEvents.onUpPressed.addListener(() => console.log("Up!"));
    keypressEvents.onDownPressed.addListener(() => console.log("Down!"));
    keypressEvents.onLeftPressed.addListener(() => console.log("Left!"));
    keypressEvents.onRightPressed.addListener(() => console.log("Right!"));
}

main();