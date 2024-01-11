import { ReactNode, useState } from "react"
import { trpc } from "./trpc";

function App() {
  const [path, setPath] = useState("");

  const fileQuery = trpc.getFiles.useQuery(path, {
    enabled: false, // Disable query from automaticaly running
    retry: false, // No need to retry if fail
    queryFn: async () => {
      const response = await fetch(`/api/files?path=${path}`);
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage)
      }

      // How to guarantee the type here... tRPC? common type folder with TypeScript? it works but so fragile
      return await response.json() as string[];
    }
  })

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

          {!fileQuery.isRefetching &&
            <button
              className="text-slate-600 hover:text-slate-500 px-2"
              onClick={() => fileQuery.refetch()}
            >
              Refresh
            </button>
          }
        </div>

        {fileQuery.isLoading && <p>No files</p>}
        {fileQuery.isRefetching && <p>Refreshing...</p>}
        {fileQuery.isError && !fileQuery.isRefetching && <p className="text-red-500">Error: {fileQuery.error.message}</p>}
        {fileQuery.isSuccess &&
          <ul>
            {fileQuery.data.map((file, index) => <ListElement key={index}>{file}</ListElement>)}
          </ul>
        }

      </div>
    </div>
  )
}

interface IListElementProps {
  key: React.Key
  children: ReactNode
}

function ListElement({ key, children }: IListElementProps) {
  return (
    <li key={key} className="bg-slate-800 text-slate-100 px-2 pb-1 first:pt-1 first:rounded-t-md last:rounded-b-md">
      {children}
    </li>
  )
}

export default App
