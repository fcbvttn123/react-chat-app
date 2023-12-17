import { useState, useEffect } from "react"

import { roomsFireStoreCollection, db } from "../firebase"
import { setDoc, doc, snapshotEqual } from "firebase/firestore"

import { v4 } from "uuid"

// Realtime DB
import { realtimeDb } from "../firebase"
import {ref, onValue, set} from "firebase/database"

export function RoomChatScreen(props) {

    const [allMessages, setAllMessages] = useState(null)
    const [inputValue, setInputValue] = useState("")

    function sendMessage(submitEvent) {
        submitEvent.preventDefault()
        pushNewMessage({
            userId: props.userId, 
            message: inputValue
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
            setAllMessages(msgArr)
        })
    }

    useEffect(() => {
        getMessages()
    }, [])
    
    return (
        <div className="room-chat-box">
            <h1>Room ID: {props.roomId}</h1>
            <form className="message-input-box" onSubmit={(e) => {sendMessage(e)}}>
                <input type="text" name="message" id="message"  onChange={e => setInputValue(e.target.value)}/>
                <button>Send</button>
            </form>
            <div className="display-msg">
                {allMessages && allMessages.map(e => <p key={v4()}>{e.userId}: {e.message}</p>)}
            </div>
        </div>
    )
}