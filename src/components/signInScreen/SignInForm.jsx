import { useState, useEffect } from "react";

// Realtime DB
import { realtimeDb } from "../../firebase";
import { ref, onValue, set } from "firebase/database";

export function SignInForm(props) {
  const [signInFormData, setSignInFormData] = useState({
    username: "",
    password: "",
  });

  const [invalidCredentials, setInvalidCredentials] = useState(null);

  function handleFormDataChanged(e) {
    const { name, value } = e.target;
    setSignInFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function submitForm(e) {
    e.preventDefault();
    const reference = ref(realtimeDb, `accounts/${signInFormData.username}`);
    onValue(reference, (snapShot) => {
      if (
        snapShot.val() &&
        snapShot.val().password == signInFormData.password
      ) {
        setInvalidCredentials(false);
        props.handleScreen("room-screen", signInFormData.username);
      } else {
        setInvalidCredentials(true);
      }
    });
  }

  return (
    <div className="sign-in-form">
      <h1>Log In</h1>

      {/* Form */}
      <form onSubmit={submitForm}>
        <input
          type="text"
          name="username"
          id="username-input"
          placeholder="Username"
          onChange={handleFormDataChanged}
          value={signInFormData.username}
        />{" "}
        <br />
        <input
          type="password"
          name="password"
          id="password-input"
          placeholder="Password"
          onChange={handleFormDataChanged}
          value={signInFormData.password}
        />{" "}
        <br />
        <button>Login</button> <br />
      </form>

      {/* Sign Up Container */}
      <div className="sign-up-container">
        <span>Not a Member ?</span>
        <button className="sign-up" onClick={() => props.changeForm("sign-up")}>
          Sign Up now
        </button>
      </div>

      {invalidCredentials && <p>Your username or password is incorrect</p>}
    </div>
  );
}
