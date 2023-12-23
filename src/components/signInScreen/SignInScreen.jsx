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

    return (
        <div className="sign-in-screen">
            {currentForm == "sign-in-screen" ? <SignInForm changeForm={changeForm} handleScreen={props.handleScreen} /> : <SignUpForm />}
        </div>
    )
}




  // useEffect(() => {
  //   let reference = ref(realtimeDb, "accounts");
  //   onValue(reference, (snapShot) => {
  //     let usernames = Object.keys(snapShot.val());
  //     usernames.forEach((username) => {
  //       let usernameRef = ref(realtimeDb, `accounts/${username}/active`);
  //       set(usernameRef, false);
  //     });
  //   });
  // }, []);