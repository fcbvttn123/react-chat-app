import { useState, useEffect } from "react"

import { roomsFireStoreCollection } from "../firebase"
import { getDocs, addDoc } from "firebase/firestore"

export function RoomChatScreen(props) {
    const [currentMsg, setCurrentMsg] = useState("")
    const [msgHistory, setMsgHistory] = useState(props.roomMsg)
    console.log(msgHistory)
    
    function pushNewMsg(onSubmitEventInfo) {
        onSubmitEventInfo.preventDefault()
        setMsgHistory(prev => [...prev, {
            userId: 333,
            message: currentMsg
        }])
    }

    return (
        <div className="room-chat-box">
            <h1>Room ID: {props.roomId}</h1>
            <form className="message-input-box" onSubmit={e => pushNewMsg(e)}>
                <input type="text" name="message" id="message" onChange={e => setCurrentMsg(e.target.value)} />
                <button>Send</button>
            </form>
            <div className="display-msg"></div>
        </div>
    )
}