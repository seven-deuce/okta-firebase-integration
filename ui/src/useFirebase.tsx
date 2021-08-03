import React, {useEffect} from "react"
import firebase from "firebase/app"
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyC1gJBrgFMsE66WgjfCMacuF1Dxrhu8TPA",
    authDomain: "fir-okta-integration.firebaseapp.com",
    projectId: "fir-okta-integration",
    storageBucket: "fir-okta-integration.appspot.com",
    messagingSenderId: "260342698092",
    appId: "1:260342698092:web:66e55546d43ee4a6884849",
    measurementId: "G-TE5NVLMBBK",
}


firebase.apps.length ?  firebase.app() : firebase.initializeApp(firebaseConfig)

export default function useFirebase() {
    const [user, setUser] = React.useState<firebase.User | null>(null)

   useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
            
            setUser(firebaseUser)
        })

        return unsubscribe
    }, [])
    return { user, firebase }
}