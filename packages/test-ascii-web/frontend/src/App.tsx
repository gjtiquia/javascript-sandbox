import { useEffect, useState } from 'react';
import { DPad } from './DPad';
import { Footer } from './Footer';
import { Header } from './Header';
import { TextCanvas as TextCanvasElement } from './TextCanvas';

import { Player, TextCanvas } from "test-game";

const _textCanvas = new TextCanvas(30, 10);
const _player = new Player();

function App() {

  const [renderText, setRenderText] = useState("");

  useEffect(() => {
    render();
  }, [])

  function render() {
    _textCanvas.clear();
    _textCanvas.drawCharacter(_player.position.x, _player.position.y, "@");

    setRenderText(_textCanvas.paint());
  }

  return (
    <div className="h-full p-2 flex flex-col items-center bg-stone-950">
      <div className="pt-2">
        <Header />
      </div>

      <div className="flex-grow flex flex-col justify-center items-center">
        <TextCanvasElement text={renderText} />
      </div>

      <div className="pb-2">
        <DPad />
      </div>

      <div className="w-full max-w-prose">
        <Footer />
      </div>
    </div>
  )
}

export default App
