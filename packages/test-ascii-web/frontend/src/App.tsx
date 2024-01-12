import { DPad } from './DPad';
import { Footer } from './Footer';
import { Header } from './Header';
import { TextCanvas } from './TextCanvas';

function App() {

  const backgroundChar = ".";
  const canvasWidth = 30;
  const canvasHeight = 10;
  const renderText = (backgroundChar.repeat(canvasWidth) + "\n").repeat(canvasHeight)

  return (
    <div className="h-full p-2 flex flex-col items-center bg-stone-950">
      <div className="pt-2">
        <Header />
      </div>

      <div className="flex-grow flex flex-col justify-center items-center">
        <TextCanvas text={renderText} />
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
