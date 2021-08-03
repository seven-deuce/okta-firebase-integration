import React , {useEffect, useState} from "react"
import { useOktaAuth } from "@okta/okta-react"
import useFirebase from "../useFirebase"
import { Redirect } from "react-router-dom"
import {FIREBASE_ENDPOINT} from "../const"
import Spinner from "./Spinner"

const LoginCallback = () => {
    const { oktaAuth } = useOktaAuth()
    const { firebase } = useFirebase()
    const [redirect, setRedirect] = useState(false)
    const [ error, setError ] = useState("") 


    useEffect(() => {
        async function mintToken() {
            
            try {
                // Get the access token from Okta.
                const oktaTokenResponse = await oktaAuth.token.parseFromUrl()
                const accessToken = oktaTokenResponse.tokens.accessToken?.accessToken    
                
                oktaTokenResponse!.tokens!.idToken && oktaAuth.tokenManager.add("idToken", oktaTokenResponse.tokens.idToken )
         
                // Use the access token to call the firebaseCustomToken endpoint.
                const firebaseTokenResponse = await fetch(FIREBASE_ENDPOINT , {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                const firebaseToken = await firebaseTokenResponse.text()
               

                await firebase.auth().signInWithCustomToken(firebaseToken)
                setRedirect(true)
            } catch (err) {
                setError("Error signing in with custom token. Please try again.")
                console.error(err)
            }
        }
        mintToken()
    }, [])

    if(error) return <Redirect to="/protected" />
    {
        return !redirect ? <Spinner />  : <Redirect to="/protected" />
    }
}

export default LoginCallback