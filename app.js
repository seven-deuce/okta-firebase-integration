const express = require("express")
const app = express()
const cors = require("cors")
const firebaseAdmin = require("firebase-admin")
const oktaAuth = require("./oktaMiddleware")
var serviceAccount = require("./fir-okta-integration-firebase-adminsdk-yfj1r-6cacfe091a.json")
const firebaseApp = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
})
const port = process.env.PORT || 4000
app.use(cors({ origin: /localhost:3000/i }))

// Get a Firebase custom auth token for the authenticated Okta user.
// This endpoint uses the `oktaAuth` middleware defined above to
// ensure requests have a valid Okta access token.

app.get("/firebaseCustomToken", oktaAuth, async (req, res) => {
    const oktaUid = req.jwt.claims.uid

    try {
        const firebaseToken = await firebaseApp.auth().createCustomToken(oktaUid)
        res.send(firebaseToken)
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Error minting token.")
    }
})



app.listen(port, console.log(`Okta-firebase-integration-app is listening on ${port} at ${new Date().toLocaleString()}`))