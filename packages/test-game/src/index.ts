import { TextCanvas } from "./TextCanvas";
import { startListeningToKeypressEvents } from "./KeypressListener";
import { Player } from "./Player";


const _textCanvas = new TextCanvas(33, 9);

// TODO : Probably list of game objects? might be overkill tho, we'll see
const _player = new Player();

function main() {
    render();

    const keypressEvents = startListeningToKeypressEvents();
    keypressEvents.onUpPressed.addListener(onUpPressed);
    keypressEvents.onDownPressed.addListener(onDownPressed);
    keypressEvents.onLeftPressed.addListener(onLeftPressed);
    keypressEvents.onRightPressed.addListener(onRightPressed);
}

function onUpPressed() {
    _player.moveUp();
    render();
}

function onDownPressed() {
    _player.moveDown();
    render();
}

function onLeftPressed() {
    _player.moveLeft();
    render();
}

function onRightPressed() {
    _player.moveRight();
    render();
}

function render() {
    _textCanvas.clear();

    // TODO : position should be translated via Camera
    _textCanvas.drawCharacter(_player.position.x, _player.position.y, "K");

    console.clear();
    console.log(_textCanvas.paint());
}

main();