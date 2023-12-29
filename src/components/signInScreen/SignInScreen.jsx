import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";

import { useState } from "react"

import googleLogo from "../../assets/google.png"

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
      <div className="signin-screen">
        <h1 className="main-header">Chat App</h1>
        <p>Click the below button to sign in with your Google account !</p>
        <button className="btn-signin" onClick={signInWithGoogle}>
          <img src={googleLogo} alt="" />
          <p>Sign In with your Google Account</p>
        </button>
      </div>
    )
}