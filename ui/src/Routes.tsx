import React from "react"
import { Route, Switch, useHistory } from "react-router-dom"
import { Security } from "@okta/okta-react"
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js"
import { OKTA_ORG_URL, CLIENT_ID, REDIRECT_URI } from "./const"
import Home from "./components/Home"
import Protected from "./components/Protected"
import LoginCallback from "./components/LoginCallback"

const oktaAuth = new OktaAuth({
    issuer: `${OKTA_ORG_URL}/oauth2/default`,
    clientId: CLIENT_ID,
    redirectUri: REDIRECT_URI,
})

const Routes = () => {
    const history = useHistory()

    const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
        history.replace(toRelativeUrl(originalUri || "/", window.location.origin))
    }

    return (
        <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
            <Switch>
                <Route path="/login/callback" component={LoginCallback} />
                <Route path="/protected" component={Protected} />
                <Route path="/" component={Home} />
                <Route
                    render={(props) => {
                        return <h1>404</h1>
                    }}
                />
            </Switch>
        </Security>
    )
}

export default Routes