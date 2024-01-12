import { useState } from "react";

interface IDPadProps {
    onUpPressDown: () => void,
    onDownPressDown: () => void,
    onLeftPressDown: () => void,
    onRightPressDown: () => void,
}

export function DPad(props: IDPadProps) {
    return <div className="flex flex-col items-center gap-3">
        <DButton onPressDown={props.onUpPressDown} />
        <div className="flex gap-3">
            <DButton onPressDown={props.onLeftPressDown} />
            <DButton onPressDown={props.onDownPressDown} />
            <DButton onPressDown={props.onRightPressDown} />
        </div>
    </div>;
}

interface IDButtonProps {
    onPressDown: () => void
}

function DButton(props: IDButtonProps) {
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
        onMouseUp={() => setIsPressed(false)}
        onMouseDown={() => {
            // This works in PC only to set button ascii
            setIsPressed(true);

            // This also gets called in mobile
            props.onPressDown();
        }}
        onMouseLeave={() => setIsPressed(false)}
        onTouchStart={() => {
            // This works in mobile only to set button ascii
            setIsPressed(true)
        }}
        onTouchEnd={() => setIsPressed(false)}
    >
        <code className="whitespace-pre-wrap select-none">
            {buttonAscii}
        </code>
    </button>;
}
