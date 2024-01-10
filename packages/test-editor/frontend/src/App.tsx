import { ReactNode, useState } from "react"


function App() {
  const [path, setPath] = useState("");
  const [files, setFiles] = useState(["No files"])

  function onRefreshClicked() {
    setFiles(["testing"])
  }

  return (
    <div className="p-5 flex flex-col gap-5">
      <h1 className="font-bold text-3xl text-slate-100 text-center">
        Game Engine Editor
      </h1>

      <div className="p-3 bg-slate-700 rounded-lg flex flex-col gap-2">
        <h2 className="font-bold text-xl text-slate-100">
          Files
        </h2>

        <div className="flex bg-slate-800 rounded-md pl-2">
          <p className="text-slate-500">
            Path:
          </p>
          <input
            className="bg-slate-800 pl-1 rounded-md w-full text-slate-100"
            onChange={e => setPath(e.target.value)}
            value={path}
          />

          <button
            className="text-slate-600 hover:text-slate-500 px-2"
            onClick={(onRefreshClicked)}
          >
            Refresh
          </button>
        </div>

        <ul>
          {files.map(file => <ListElement>{file}</ListElement>)}
        </ul>

      </div>
    </div>
  )
}

function ListElement({ children }: { children: ReactNode }) {
  return (
    <li className="bg-slate-800 text-slate-100 px-2 pb-1 first:pt-1 first:rounded-t-md last:rounded-b-md">
      {children}
    </li>
  )
}

export default App
