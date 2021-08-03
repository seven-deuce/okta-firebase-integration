const OKTA_ORG_URL = "https://dev-56792516.okta.com"
const OktaJwtVerifier = require("@okta/jwt-verifier")
const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: `${OKTA_ORG_URL}/oauth2/default`,
})

const oktaAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization || ""
    const match = authHeader.match(/Bearer (.+)/)

    if (!match) {
        res.status(401)
        return next("Unauthorized")
    }

    const accessToken = match[1]
    try {
        const jwt = await oktaJwtVerifier.verifyAccessToken(accessToken, "api://default")
        req.jwt = jwt
        return next() // Pass the request on to the main route.
    } catch (err) {
        console.log(err.message)
        res.status(401)
        return next("Unauthorized")
    }
}

module.exports = oktaAuth