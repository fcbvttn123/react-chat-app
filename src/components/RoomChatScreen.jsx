import { useState, useEffect } from "react"

import { roomsFireStoreCollection, db } from "../firebase"
import { setDoc, doc } from "firebase/firestore"

export function RoomChatScreen(props) {
    return (
        <div className="room-chat-box">
            <h1>Room ID: {props.roomId}</h1>
            <form className="message-input-box">
                <input type="text" name="message" id="message" />
                <button>Send</button>
            </form>
            <div className="display-msg"></div>
        </div>
    )
}