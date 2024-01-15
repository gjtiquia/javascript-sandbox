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
            const response = await fetch("http://localhost:3000/profile", {
                method: "get",
                headers: new Headers({
                    "Authorization": "Bearer " + props.authSession.accessToken
                }),
            });

            console.log(response);

            const responseObject = await response.json();
            return JSON.stringify(responseObject);
        }
    })

    const signOutMutation = useMutation({
        mutationFn: async () => await props.authClient.signOutAsync()
    })

    if (signOutMutation.isPending)
        return <p>Signing out...</p>;

    if (profileQuery.isPending)
        return <p>Fetching data...</p>

    return (<div>
        <p>Signed In!</p>
        <p>Email: {props.authSession.email}</p>
        <p>User ID: {props.authSession.userId}</p>

        <p>Backend Data:</p>
        <p>{profileQuery.data}</p>

        <button onClick={() => signOutMutation.mutate()}>
            Sign Out
        </button>
    </div>);
}
