import {
    GoogleSignin,
    GoogleSigninButton,
    User,
    statusCodes,
} from '@react-native-google-signin/google-signin'
import { supabase } from '../lib/supabase'
import { Button, Text } from 'react-native';
import { useState } from 'react';

export default function GoogleSigninButtonWrapper() {

    const [user, setUser] = useState<User | null>(null);

    const supabaseAuthWebClientId = process.env.EXPO_PUBLIC_AUTH_WEB_CLIENT_ID;

    GoogleSignin.configure({
        webClientId: supabaseAuthWebClientId, // Use web client! Not the android/ios client!
    })

    return <>
        <Text style={{ color: "white" }} >Google Signed In: {user === null ? "False" : "True"}</Text>

        {!user &&

            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={async () => {

                    try {
                        await GoogleSignin.hasPlayServices()

                        const user = await GoogleSignin.signIn()
                        setUser(user);

                        if (user.idToken) {

                            const { data, error } = await supabase.auth.signInWithIdToken({
                                provider: 'google',
                                token: user.idToken,
                            })

                            // console.log(error, data)

                        } else {
                            throw new Error('no ID token present!')
                        }

                    } catch (error: any) {
                        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                            // user cancelled the login flow
                            console.error("SIGN_IN_CANCELLED", error)

                        } else if (error.code === statusCodes.IN_PROGRESS) {
                            // operation (e.g. sign in) is in progress already
                            console.error("IN_PROGRESS", error)

                        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                            // play services not available or outdated
                            console.error("PLAY_SERVICES_NOT_AVAILABLE", error)

                        } else {
                            // some other error happened
                            console.error("something wrong happened", error)
                        }
                    }
                }}
            />
        }

        {user &&
            <Button
                title='Google Sign Out'
                onPress={async () => {
                    try {
                        await GoogleSignin.signOut();
                        setUser(null);
                    } catch (error) {
                        console.error(error);
                    }
                }}
            />
        }

    </>
}