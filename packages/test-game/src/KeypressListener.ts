import * as readline from "readline"
import { EventAction } from "./EventAction";

export class KeypressEvents {
    public onUpPressed: EventAction = new EventAction();
    public onDownPressed: EventAction = new EventAction();
    public onLeftPressed: EventAction = new EventAction();
    public onRightPressed: EventAction = new EventAction();
}

export function startListeningToKeypressEvents(): KeypressEvents {
    const keypressEvents = new KeypressEvents();

    readline.emitKeypressEvents(process.stdin);

    process.stdin.setRawMode(true);
    process.stdin.on('keypress', (str, key) => keypressEventHandler(str, key, keypressEvents));

    return keypressEvents;
}

function keypressEventHandler(str: string, key: readline.Key, keypressEvents: KeypressEvents) {
    // "Raw" mode so we must do our own kill switch
    if (key.ctrl && key.name === "c")
        process.exit();

    if (key.name === "w" || key.name === "up")
        keypressEvents.onUpPressed.invoke();

    if (key.name === "a" || key.name === "left")
        keypressEvents.onLeftPressed.invoke();

    if (key.name === "s" || key.name === "down")
        keypressEvents.onDownPressed.invoke();

    if (key.name === "d" || key.name === "right")
        keypressEvents.onRightPressed.invoke();
}