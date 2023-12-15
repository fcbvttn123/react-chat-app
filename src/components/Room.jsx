import { PickRoomIdScreen } from "./PickRoomIdScreen"
import { RoomChatScreen } from "./RoomChatScreen"

import { roomsFireStoreCollection } from "../firebase"
import { addDoc, onSnapshot } from "firebase/firestore"

import { useEffect, useState } from "react"

export function Room() {
    const [roomId, setRoomId] = useState(null)
    const [existingRooms, setExistingRooms] = useState(null)

    let currentRoomObject = (roomId && existingRooms) && existingRooms.find(room => room.roomId == roomId)
    let currentRoomMessages = currentRoomObject && currentRoomObject.messages
    let currentRoomDocId = (roomId && existingRooms) && existingRooms.find(room => room.roomId == roomId)?.id;

    function checkRoomId(roomId, eventInfo) {
        eventInfo.preventDefault()
        let roomIsExisting = existingRooms.find(room => room.roomId == roomId)
        if(roomIsExisting) {
            setRoomId(roomId)
        } else {
            createDocument(roomId)
        }
    }

    async function createDocument(roomId) {
        await addDoc(roomsFireStoreCollection, {
            roomId: roomId, 
            messages: []
        })
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(roomsFireStoreCollection, snapShot => {
            setExistingRooms(snapShot.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            }));
        })
        return unsubscribe
    }, [])

    return (
        <>
            {roomId ? <RoomChatScreen roomDocId={currentRoomDocId} roomId={roomId} currentRoomMessages={currentRoomMessages}/> : <PickRoomIdScreen enterRoomFunc={checkRoomId}/>}
        </>
    )
}