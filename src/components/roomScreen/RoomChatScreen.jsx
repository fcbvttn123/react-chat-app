import { useState, useEffect } from "react"
import { v4 } from "uuid"

// Realtime DB
import { realtimeDb } from "../../firebase"
import {ref, onValue, set} from "firebase/database"

export function RoomChatScreen(props) {

    const [allMessages, setAllMessages] = useState(null)
    const [inputValue, setInputValue] = useState("")

    function sendMessage(submitEvent) {
        submitEvent.preventDefault()
        pushNewMessage({
            userId: props.userId, 
            message: inputValue, 
            time: Date.now()
        })
        setInputValue("")
    }

    function pushNewMessage(obj) {
        const reference = ref(realtimeDb, `rooms/${props.roomId}/messages/${v4()}`)
        set(reference, obj)
    }

    function getMessages() {
        let reference = ref(realtimeDb, `rooms/${props.roomId}/messages`)
        onValue(reference, snapShot => {
            let msgArr = []
            snapShot.forEach(child => {
                msgArr.push(child.val())
            })
            setAllMessages(msgArr.sort((a, b) => a.time - b.time))
        })
    }

    function backToPickRoomScreen() {
        props.setCurrentRoom(null)
    }

    useEffect(() => {
        getMessages()
    }, [])
    
    return (
        <div className="room-chat-box">
            <h1 className="main-header">Room ID: {props.roomId}</h1>
            <div className="chat-box-component">
                <div className="display-msg">
                    {allMessages && allMessages.map(e => <p className="msg" key={v4()}><span className="username">{e.userId}:</span> {e.message}</p>)}
                </div>
                <form className="message-input-box" onSubmit={(e) => {sendMessage(e)}}>
                    <input type="text" name="message" id="message" value={inputValue} onChange={e => setInputValue(e.target.value)}/>
                    <button>Send</button>
                </form>
            </div>
            <button className="btn-back" onClick={backToPickRoomScreen}>Back</button>
        </div>
    )
}