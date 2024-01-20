import { useAuth } from "./utils/auth/useAuth";
import { AppContents } from "./AppContents"
import { AppProviders } from "./AppProviders"

function App() {

    const auth = useAuth();

    return (
        <AppProviders >
            <AppContents
                isAuthInitializing={auth.isInitializing}
                isAuthSignedIn={auth.isSignedIn}
                authClient={auth.client}
                authSession={auth.session}
            />
        </AppProviders>
    )
}

export default App