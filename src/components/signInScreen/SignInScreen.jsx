import { SignInForm } from "./SignInForm"
import { SignUpForm } from "./SignUpForm"

import { useState } from "react"

export function SignInScreen(props) {

    const [currentForm, setCurrentForm] = useState("sign-in-form")

    function changeForm(formName) {
        setCurrentForm(formName)
    }

    return (
        <div className="sign-in-screen">
            {currentForm == "sign-in-form" ? <SignInForm changeForm={changeForm} handleScreen={props.handleScreen} /> : <SignUpForm changeForm={changeForm} />}
        </div>
    )
}