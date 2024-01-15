import { AuthClient, AuthSession } from "../utils/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

interface MainPageProps {
    authClient: AuthClient,
    authSession: AuthSession
}

export function MainPage(props: MainPageProps) {

    const profileQuery = useQuery({
        queryKey: ["profileQuery", props.authSession.userId],
        queryFn: async () => {

            const response = await fetch(import.meta.env.VITE_API_URL + "/profile", {
                method: "get",
                headers: new Headers({
                    "Authorization": "Bearer " + props.authSession.accessToken
                }),
            });

            return await response.json();
        }
    })

    const signOutMutation = useMutation({
        mutationFn: async () => await props.authClient.signOutAsync()
    })

    if (signOutMutation.isPending)
        return <p>Signing out...</p>;

    if (profileQuery.isPending)
        return <p>Fetching data...</p>

    if (profileQuery.isError)
        return <div>
            <p>Error: {profileQuery.error.message}</p>
            <button onClick={() => profileQuery.refetch()}>
                Retry
            </button>
            <button onClick={() => signOutMutation.mutate()}>
                Sign Out
            </button>
        </div>

    return (<div>
        <p>Signed In!</p>
        <p>Email: {props.authSession.email}</p>
        <p>User ID: {props.authSession.userId}</p>

        <div>
            <span>API URL: </span>
            <span>{import.meta.env.VITE_API_URL}</span>
        </div>
        <p>Backend Data:</p>
        <p>{JSON.stringify(profileQuery.data)}</p>

        <button onClick={() => signOutMutation.mutate()}>
            Sign Out
        </button>
    </div>);
}
