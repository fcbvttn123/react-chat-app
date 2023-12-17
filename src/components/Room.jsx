import { PickRoomIdScreen } from "./PickRoomIdScreen"
import { RoomChatScreen } from "./RoomChatScreen"

import { roomsFireStoreCollection } from "../firebase"
import { addDoc, onSnapshot, snapshotEqual } from "firebase/firestore"
import { v4 } from "uuid"

import { useEffect, useState } from "react"

// Realtime DB
import { realtimeDb } from "../firebase"
import {ref, onValue, set} from "firebase/database"

export function Room() {
    const [currentRoom, setCurrentRoom] = useState(null)
    const [existingRooms, setExistingRooms] = useState(null)
    // Hard code users
    const [currentUser, setCurrentUser] = useState(() => new Date().getTime())

    function checkRoomId(roomId) {
        let roomIsExisting = existingRooms.find(room => room == roomId)
        if(roomIsExisting) {
          setCurrentRoom(roomId)
        } else {
          createNewRoom(roomId)
        }
    }

    function createNewRoom(roomId) {
      let reference = ref(realtimeDb, `rooms/${roomId}/messages`)
      set(reference, {
        message1: {
          userId: currentUser, 
          message: `${currentUser} created this room`,
          time: new Date().getTime()
        }
      })
    }

    useEffect(() => {
        const reference = ref(realtimeDb, "rooms")
        onValue(reference, snapShot => {
            let roomArray = []
            snapShot.forEach(child => {
              roomArray.push(child.key)
            })
            setExistingRooms(roomArray)
        })
    }, [])

    return (
      <>
        {currentRoom ? (
          <RoomChatScreen roomId={currentRoom} userId={currentUser}/>
        ) : (
          <PickRoomIdScreen submitRoomId={checkRoomId} />
        )}
      </>
    );
}