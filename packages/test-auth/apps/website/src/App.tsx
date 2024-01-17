
import { SignInPage } from "./components/SignInPage";
import { MainPage } from "./components/MainPage";
import { useAuth } from "./utils/auth/useAuth";

function App() {
  const auth = useAuth();

  if (auth.isInitializing)
    return <p>Auth Initializing...</p>

  return (
    <>
      <h1>Test Auth</h1>

      {auth.isSignedIn ?
        <MainPage authClient={auth.client} authSession={auth.session!} />
        :
        <SignInPage authClient={auth.client} />
      }
    </>
  )
}

export default App



