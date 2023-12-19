import { SignInForm } from "./SignInForm"
import { SignUpForm } from "./SignUpForm"

import { useState } from "react"

export function SignInScreen() {
    const [currentForm, setCurrentForm] = useState("sign-in")
    function changeForm(formName) {
        setCurrentForm(formName)
    }
    return (
        <div className="sign-in-screen">
            {currentForm == "sign-in" ? <SignInForm changeForm={changeForm} /> : <SignUpForm />}
        </div>
    )
}