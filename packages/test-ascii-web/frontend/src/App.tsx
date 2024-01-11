function App() {
  return (
    <div className="h-full p-2 flex flex-col items-center bg-stone-800">

      <div className="pt-8">
        <h1 className="text-stone-200 font-bold text-3xl">
          <code>
            ASCII RPG
          </code>
        </h1>
      </div>

      <div className="flex-grow flex flex-col justify-center items-center">
        <code className="whitespace-pre-wrap text-stone-100" >
          {
            "*****************************\n" +
            "*****************************\n" +
            "*****************************\n" +
            "*****************************\n" +
            "*****************************\n" +
            "*****************************\n" +
            "*****************************\n" +
            "*****************************\n" +
            "*****************************\n" +
            "*****************************\n" +
            "*****************************\n"
          }
        </code>
      </div>

      <div className="pt-8 pb-4">
        <DPad />
      </div>

      <div className="w-full max-w-prose">
        <p className="text-stone-500 text-end">
          GJTiquia
        </p>
      </div>
    </div>
  )
}

function DPad() {
  return <div className="flex flex-col items-center gap-2">
    <DButton />
    <div className="flex gap-2">
      <DButton />
      <DButton />
      <DButton />
    </div>
  </div>
}

function DButton() {
  return <button
    className="w-min p-12 border-2 border-stone-500 hover:bg-stone-500 hover:border-stone-500 active:bg-stone-400 active:border-stone-400"
  />
}

export default App
