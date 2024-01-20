import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin'
import { supabase } from '../lib/supabase'

export default function GoogleSigninButtonWrapper() {
    const supabaseAuthWebClientId = process.env.EXPO_PUBLIC_AUTH_WEB_CLIENT_ID;

    // TODO : SHOULD CONFIGURE ANDROID CLIENT ID!

    GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        webClientId: supabaseAuthWebClientId,
    })

    return (
        <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={async () => {

                console.log("Pressed");

                try {
                    await GoogleSignin.hasPlayServices()
                    console.log("hasPlayServices");

                    console.log("signing in...");
                    const userInfo = await GoogleSignin.signIn()
                    console.log("signed in", userInfo);

                    if (userInfo.idToken) {

                        console.log("Received id token from Google", userInfo.idToken)

                        const { data, error } = await supabase.auth.signInWithIdToken({
                            provider: 'google',
                            token: userInfo.idToken,
                        })

                        console.log(error, data)

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
    )
}