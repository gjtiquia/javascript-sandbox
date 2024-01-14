import { useEffect, useState } from "react"
import { Session, SupabaseClient, createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLIC_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [initializing, setInitializing] = useState(true);
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setInitializing(false);
    })

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log("session", session);
    })


    return () => data.subscription.unsubscribe()
  }, [])

  if (initializing)
    return <p>Initializing...</p>

  return (
    <>
      <h1>Test Auth</h1>

      {session ?
        <MainPage supabaseClient={supabase} />
        :
        <EmailSignIn supabaseClient={supabase} />
      }
    </>
  )
}

export default App

function EmailSignIn({ supabaseClient }: { supabaseClient: SupabaseClient }) {

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signUpNewUserAsync() {
    setIsLoading(true);

    const { data, error } = await supabaseClient.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: 'https://supabase.com/docs/guides/auth'
      }
    })

    console.log("signUpData", data);
    console.log("signUpError", error);

    setIsLoading(false);
  }

  async function signInWithEmailAsync() {
    setIsLoading(true);

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password,
    })

    console.log("signInData", data);
    console.log("signInError", error);

    setIsLoading(false);
  }

  if (isLoading)
    return <p>Loading...</p>

  return <>
    <div>
      <span>Email: </span>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
    </div>

    <div>
      <span>Password: </span>
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
    </div>

    <button
      onClick={() => signUpNewUserAsync()}
    >
      Sign Up
    </button>

    <button
      onClick={() => signInWithEmailAsync()}
    >
      Sign In
    </button>
  </>
}

function MainPage({ supabaseClient }: { supabaseClient: SupabaseClient }) {

  const [isLoading, setIsLoading] = useState(false);

  async function signOutAsync() {
    setIsLoading(true)

    const { error } = await supabaseClient.auth.signOut()
    console.log(error);

    setIsLoading(false);
  }

  if (isLoading)
    return <p>Loading...</p>

  return (<div>
    <p>Signed In!</p>
    <button onClick={() => signOutAsync()}>
      Sign Out
    </button>
  </div>);
}
