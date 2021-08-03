import React from "react"
import { useOktaAuth } from "@okta/okta-react"
import useFirebase from "../useFirebase"

const Home = () => {
    const { oktaAuth } = useOktaAuth()
    const { firebase, user } = useFirebase()
    // console.log(oktaAuth, authState)
    const login = async () => oktaAuth.signInWithRedirect()
    const logout = async () => {
        await Promise.all([oktaAuth.signOut(), firebase.auth().signOut()])
    }

    return (
        <div className="home">
            {!user && (
                <div>
                    <p>Click button to login. You will be transferred to Okta login page.</p>
                    <button  onClick={login}>Login</button>
                </div>
            )}
      
            {user && (
                <div>
                    <p>You are already logged in!</p>
                    <button  onClick={logout}>Logout</button>
                </div>
            )}
        </div>
    )
}

export default Home