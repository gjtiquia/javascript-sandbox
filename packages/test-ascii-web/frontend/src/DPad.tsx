import { useState } from "react";

export function DPad() {
    return <div className="flex flex-col items-center gap-3">
        <DButton />
        <div className="flex gap-3">
            <DButton />
            <DButton />
            <DButton />
        </div>
    </div>;
}
function DButton() {
    const [isPressed, setIsPressed] = useState(false);

    const buttonAscii = isPressed ?
        "###########\n" +
        "###########\n" +
        "###########\n" +
        "###########\n" +
        "###########\n"
        :
        "###########\n" +
        "#         #\n" +
        "#         #\n" +
        "#         #\n" +
        "###########\n";


    return <button
        className="text-stone-500"
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
    >
        <code className="whitespace-pre-wrap select-none">
            {buttonAscii}
        </code>
    </button>;
}
