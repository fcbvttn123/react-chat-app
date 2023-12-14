import { useState } from "react"

export function PickRoomIdScreen(props) {
    const [inputValue, setInputValue] = useState("")
    return (
        <form className="room-id-input-box" onSubmit={() => props.enterRoomFunc(inputValue)}>
            <input type="text" name="room-id" id="room-id" onChange={e => setInputValue(e.target.value)}/>
            <button>Enter</button>
        </form>
    )
}