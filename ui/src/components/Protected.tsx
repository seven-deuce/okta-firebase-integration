import React, { useEffect } from "react"
import { useOktaAuth } from "@okta/okta-react"
import useFirebase from "../useFirebase"
import { Link } from "react-router-dom"

type ProfileObject = Record<string, string | number>

const convertSnakeCase = (string: string) =>
    string
        .replace(/_/g, " ")
        .split(" ")
        .map((item) => item[0].toUpperCase() + item.slice(1))
        .join(" ")

const Protected = () => {
    const { oktaAuth } = useOktaAuth()
    const { user } = useFirebase()
    const [profile, setProfile] = React.useState<ProfileObject>()
    const filedsToExclude = ["sub", "ver", "iss", "aud", "iat", "exp", "jti", "amr", "idp", "nonce", "at_hash"]

    useEffect(() => {
        oktaAuth.tokenManager
            .get("idToken")
            .then(({ claims }: { claims: ProfileObject }) => {
                const selectedProfileData: Record<string, string | number> = Object.entries(claims).reduce((accumulator: ProfileObject, current) => {
                    if (!filedsToExclude.includes(current[0])) {
                        accumulator[current[0]] = current[1]
                    }
                    return accumulator
                }, {})
                setProfile(selectedProfileData)
            })
            .catch((err) => setProfile({}))
    }, [])

    if (user)
        return (
            <div>
                <p>This is a protected page that needs login. You can see it becuase you are logged in.</p>
                {profile &&
                    Object.entries(profile).map(([field, desc]) => (
                        <li key={field}>
                            <b>{convertSnakeCase(field)}:</b> {typeof desc === "number" ? new Date(desc * 1000).toString() : desc}
                        </li>
                    ))}
            </div>
        )
    return (
        <div>
            You are NOT authorized to visit this page. <Link to="/">Click here to log in</Link>{" "}
        </div>
    )
}

export default Protected