import { useState } from "react"

export function PickRoomIdScreen(props) {
    const [inputValue, setInputValue] = useState("")
    function submitRoomId(e) {
        e.preventDefault()
        inputValue != "" && props.submitRoomId(inputValue)
        setInputValue("")
    }
    return (
        <form className="room-id-input-box" onSubmit={(e) => submitRoomId(e)}>
            <input type="text" name="room-id" id="room-id" onChange={e => setInputValue(e.target.value)} value={inputValue}/>
            <button>Enter</button>
        </form>
    )
}