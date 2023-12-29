import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";

import { useState } from "react"

export function SignInScreen(props) {
    function signInWithGoogle() {
        signInWithPopup(auth, provider)
          .then((res) => {
            const name = res.user.displayName;
            const email = res.user.email;
            const avt = res.user.photoURL;
            localStorage.setItem("react-chat-app-currentlyLoggedInEmail", JSON.stringify({
                email, 
                name
            }))
            props.getUserName({
                email, 
                name
            })
          })
      
          .catch((err) => {
            alert(err);
          });
      }
    return (
        <button onClick={signInWithGoogle}>Sign In</button>
    )
}