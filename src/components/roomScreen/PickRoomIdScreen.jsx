import { useState } from "react"

export function PickRoomIdScreen(props) {
    const [inputValue, setInputValue] = useState("")
    
    function submitRoomId(e) {
        e.preventDefault()
        inputValue != "" && props.submitRoomId(inputValue)
        setInputValue("")
    }

    function signOut() {
        localStorage.setItem("react-chat-app-currentlyLoggedInEmail", "")
        props.setCurrentLoggedInData("")
    }
    
    return (
        <>
            <h1 className="main-header">Chat App</h1>
            <form className="room-id-input-box" onSubmit={(e) => submitRoomId(e)}>
                <h1>Type Room ID: </h1>
                <input type="text" name="room-id" id="room-id" onChange={e => setInputValue(e.target.value)} value={inputValue}/>
                <button>Enter Chat</button>
            </form>
            <button className="btn-signout" onClick={signOut}>Sign Out</button>
        </>
    )
}