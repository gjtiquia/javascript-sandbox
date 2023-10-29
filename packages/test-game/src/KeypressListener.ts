import * as readline from "readline"

export async function startListeningToKeypress() {
    readline.emitKeypressEvents(process.stdin);

    process.stdin.setRawMode(true);
    process.stdin.on('keypress', keypressEventHandler);
}

function keypressEventHandler(str: string, key: readline.Key) {
    // "Raw" mode so we must do our own kill switch
    if (key.ctrl && key.name === "c")
        process.exit();

    // TODO : Delete this when finished implementing
    console.log(key.name);

    // TODO : Should implement a generic event system like C#, where it is easy to invoke, subscribe and unsubscribe from

    /*
    if (key.name === "w" || key.name === "up")
        onUpPressedEvent.invoke();

    if (key.name === "a" || key.name === "left")
        onLeftPressedEvent.invoke();

    if (key.name === "s" || key.name === "down")
        onDownPressedEvent.invoke();

    if (key.name === "d" || key.name === "right")
        onRightPressedEvent.invoke();
    */
}