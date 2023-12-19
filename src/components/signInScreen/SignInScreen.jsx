import { SignInForm } from "./SignInForm"
import { SignUpForm } from "./SignUpForm"

import { useEffect, useState } from "react"

// Realtime DB
import { realtimeDb } from "../../firebase"
import {ref, onValue, set} from "firebase/database"

export function SignInScreen(props) {

    const [currentForm, setCurrentForm] = useState("sign-in-screen")

    function changeForm(formName) {
        setCurrentForm(formName)
    }

    useEffect(() => {
        let reference = ref(realtimeDb, "accounts")
        onValue(reference, snapShot => {
            snapShot.forEach(account => {
                let accountRef = ref(realtimeDb, `accounts/${account.key}/active`)
                onValue(accountRef, snapShot2 => {
                    console.log(snapShot2.val())
                })
                // set(accountRef, false)
            })
        })
    }, [])

    return (
        <div className="sign-in-screen">
            {currentForm == "sign-in-screen" ? <SignInForm changeForm={changeForm} handleScreen={props.handleScreen} /> : <SignUpForm />}
        </div>
    )
}