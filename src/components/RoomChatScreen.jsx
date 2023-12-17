import { useState, useEffect } from "react"

import { roomsFireStoreCollection, db } from "../firebase"
import { setDoc, doc, snapshotEqual } from "firebase/firestore"

import { v4 } from "uuid"

// Realtime DB
import { realtimeDb } from "../firebase"
import {ref, onValue, set} from "firebase/database"

export function RoomChatScreen(props) {

    const [allMessages, setAllMessages] = useState(null)

    useEffect(() => {
        let reference = ref(realtimeDb, `rooms/${props.roomId}/messages`)
        onValue(reference, snapShot => {
            let msgArr = []
            snapShot.forEach(child => {
                msgArr.push(child.val())
            })
            setAllMessages(msgArr)
        })
    }, [])
    
    return (
        <div className="room-chat-box">
            <h1>Room ID: {props.roomId}</h1>
            <form className="message-input-box">
                <input type="text" name="message" id="message" />
                <button>Send</button>
            </form>
            <div className="display-msg">
                {allMessages && allMessages.map(e => <p key={v4()}>{e.userId}: {e.message}</p>)}
            </div>
        </div>
    )
}