import { PickRoomIdScreen } from "./PickRoomIdScreen"
import { RoomChatScreen } from "./RoomChatScreen"

import { roomsFireStoreCollection } from "../firebase"
import { addDoc, onSnapshot, snapshotEqual } from "firebase/firestore"
import { v4 } from "uuid"

import { useEffect, useState } from "react"

// Realtime DB
import { realtimeDb } from "../firebase"
import {ref, onValue} from "firebase/database"

export function Room() {
    const [roomId, setRoomId] = useState(null)
    const [existingRooms, setExistingRooms] = useState(null)
    // Hard code users
    const [currentUser, setCurrentUser] = useState(() => new Date().getTime())

    let currentRoomObject = (roomId && existingRooms) && existingRooms.find(room => room.roomId == roomId)
    let currentRoomMessages = currentRoomObject && currentRoomObject.messages
    let currentRoomDocId = (roomId && existingRooms) && existingRooms.find(room => room.roomId == roomId)?.id;

    function checkRoomId(roomId) {
        // let roomIsExisting = existingRooms.find(room => room.roomId == roomId)
        // if(roomIsExisting) {
        //     setRoomId(roomId)
        // } else {
        //     createDocument(roomId)
        // }
    }

    async function createDocument(roomId) {
        await addDoc(roomsFireStoreCollection, {
            roomId: roomId, 
            messages: []
        })
    }

    useEffect(() => {
        const reference = ref(realtimeDb, "rooms")
        onValue(reference, snapShot => {
            let data = snapShot.val()
            console.log("")
            console.log(data)
            Object.keys(data).forEach(room => {
                console.log(`Room ${snapShot.key}`)
                console.log(data[room])
            })
        })
    }, [])

    return (
      <>
        {roomId ? (
          <RoomChatScreen
            roomDocId={currentRoomDocId}
            roomId={roomId}
            currentUser={currentUser}
            currentRoomMessages={currentRoomMessages}
          />
        ) : (
          <PickRoomIdScreen submitRoomId={checkRoomId} />
        )}
      </>
    );
}