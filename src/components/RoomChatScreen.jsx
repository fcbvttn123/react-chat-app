import { useState, useEffect } from "react"

import { roomsFireStoreCollection, db } from "../firebase"
import { setDoc, doc } from "firebase/firestore"

export function RoomChatScreen(props) {
    const [currentMsg, setCurrentMsg] = useState("")
    const [msgHistory, setMsgHistory] = useState(props.currentRoomMessages)

    let pTag = msgHistory.map((e, i) => <p key={i}>{`${e.userId}: ${e.message}`}</p>)

    function pushNewMsg(onSubmitEventInfo) {
        onSubmitEventInfo.preventDefault()
        setMsgHistory(prev => [...prev, {
            userId: 333,
            message: currentMsg
        }])
    }

    async function updateMsgHistory(msgHistory) {
        const docRef = doc(db, "rooms", props.roomDocId)
        await setDoc(
            docRef, 
            {roomId: props.roomId, messages: msgHistory}, 
            {merge: true}
        )
    }

    useEffect(() => {
        updateMsgHistory(msgHistory)
    }, [msgHistory])

    return (
        <div className="room-chat-box">
            <h1>Room ID: {props.roomId}</h1>
            <form className="message-input-box" onSubmit={e => pushNewMsg(e)}>
                <input type="text" name="message" id="message" onChange={e => setCurrentMsg(e.target.value)} />
                <button>Send</button>
            </form>
            <div className="display-msg">
                {pTag}
            </div>
        </div>
    )
}