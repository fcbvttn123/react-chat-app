import { useState, useEffect } from "react"

// Realtime DB
import { realtimeDb } from "../../firebase"
import {ref, onValue, set} from "firebase/database"

export function SignUpForm(props) {
    const [formData, setFormData] = useState({
        username: "", 
        password: ""
    })

    const [signUpSuccessfully, setSignUpSuccessfully] = useState(false)
    console.log(signUpSuccessfully)

    function handleFormChange(e) {
        let {name, value} = e.target
        setFormData(prev => ({
            ...prev, 
            [name]: value
        }))
    }

    function handleFormSubmit(e) {
        e.preventDefault()
        checkIfAccountIsInDB(formData.username, formData.password)
        setFormData({
            username: "", 
            password: ""
        })
    }

    function checkIfAccountIsInDB(username, password) {
        let reference = ref(realtimeDb, `accounts/${username}`)
        onValue(reference, snapShot => {
            if(!snapShot.val()) {
                setSignUpSuccessfully(true)
                createAccount(username, password)
            } 
        })
    }

    function createAccount(username, password) {
        let passwordReference = ref(realtimeDb, `accounts/${username}/password`)
        set(passwordReference, password)
        let usernameReference = ref(realtimeDb, `accounts/${username}/username`)
        set(usernameReference, username)
    }

    useEffect(() => {
        setTimeout(() => {
            setSignUpSuccessfully(false)
        }, 3000);
    }, [signUpSuccessfully])

    return (
        <div className="sign-up-form">
            <div className="text">
                <h1>Sign Up</h1>
                <p>Already a member?
                    <button onClick={() => props.changeForm("sign-in-form")}>Log in</button>
                </p>
                {signUpSuccessfully && <p>Account Created !!!</p>}
            </div>
            <form className="form" onSubmit={handleFormSubmit}>
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleFormChange}/> <br />
                <input type="password" name="password" id="password" placeholder="Password" value={formData.password} onChange={handleFormChange}/> <br />
                <button>Sign Up</button>
            </form>
        </div>
    )
}