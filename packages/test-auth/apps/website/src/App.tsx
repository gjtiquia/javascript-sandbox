
import { EmailSignIn } from "./components/EmailSignIn";
import { MainPage } from "./components/MainPage";
import { useAuth } from "./utils/auth/useAuth";

function App() {
  const auth = useAuth();

  if (auth.isInitializing)
    return <p>Initializing...</p>

  return (
    <>
      <h1>Test Auth</h1>

      {auth.isSignedIn ?
        <MainPage authClient={auth.client} />
        :
        <EmailSignIn authClient={auth.client} />
      }
    </>
  )
}

export default App


