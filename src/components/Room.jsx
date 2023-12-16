import { PickRoomIdScreen } from "./PickRoomIdScreen"
import { RoomChatScreen } from "./RoomChatScreen"

import { roomsFireStoreCollection } from "../firebase"
import { addDoc, onSnapshot } from "firebase/firestore"
import { v4 } from "uuid"

import { useEffect, useState } from "react"

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
        console.log(roomId)
    }

    async function createDocument(roomId) {
        await addDoc(roomsFireStoreCollection, {
            roomId: roomId, 
            messages: []
        })
    }

    useEffect(() => {
        
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