import { useState } from "react";

function App() {
  return (
    <div className="h-full p-2 flex flex-col items-center bg-stone-950">

      <div className="pt-2">
        <h1 className="hidden">
          ASCII RPG
        </h1>
        <code className="whitespace-pre-wrap text-stone-100 text-xs sm:text-base">
          {
            "____ ____ ____ _ _    ____ ___  ____ \n" +
            "|__| [__  |    | |    |__/ |__] | __ \n" +
            "|  | ___] |___ | |    |  \\ |    |__]"
          }
        </code>
      </div>

      <div className="flex-grow flex flex-col justify-center items-center">
        <code className="whitespace-pre-wrap text-stone-100" >
          {
            "******************************\n" +
            "******************************\n" +
            "******************************\n" +
            "******************************\n" +
            "******************************\n" +
            "******************************\n" +
            "******************************\n" +
            "******************************\n" +
            "******************************\n"
          }
        </code>
      </div>

      <div className="pb-2">
        <DPad />
      </div>

      <div className="w-full max-w-prose">
        <p className="text-stone-500 text-end font-mono">
          GJTiquia
        </p>
      </div>
    </div>
  )
}

function DPad() {
  return <div className="flex flex-col items-center gap-3">
    <DButton />
    <div className="flex gap-3">
      <DButton />
      <DButton />
      <DButton />
    </div>
  </div>
}

function DButton() {
  const [isPressed, setIsPressed] = useState(false);

  const buttonAscii =
    isPressed ?
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
      "###########\n"
    ;


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
  </button>
}

export default App
