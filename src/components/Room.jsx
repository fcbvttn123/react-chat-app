import { PickRoomIdScreen } from "./PickRoomIdScreen"
import { RoomChatScreen } from "./RoomChatScreen"

import { roomsFireStoreCollection } from "../firebase"
import { getDocs, addDoc } from "firebase/firestore"

import { useEffect, useState } from "react"

export function Room() {
    const [roomId, setRoomId] = useState(null)
    const [existingRooms, setExistingRooms] = useState(null)

    let currentRoom = (roomId && existingRooms) && existingRooms.find(room => room.roomId == roomId)
    let roomMsg = currentRoom && currentRoom.messages

    function getRoomId(roomId) {
        let roomIsExisting = existingRooms.find(room => room.roomId == roomId)
        if(roomIsExisting) {
            setRoomId(roomId)
        } else {
            createDocument(roomId)
        }
    }

    async function getFireStoreRooms() {
        const data = await getDocs(roomsFireStoreCollection);
        setExistingRooms(data.docs.map(doc => {
            return {
                ...doc.data(),
                id: doc.id
            }
        }));
    }

    async function createDocument(roomId) {
        await addDoc(roomsFireStoreCollection, {
            roomId: roomId, 
            messages: []
        })
    }

    useEffect(() => {
        getFireStoreRooms()
    }, [])

    return (
        <>
            {roomId ? <RoomChatScreen roomId={roomId} roomMsg={roomMsg}/> : <PickRoomIdScreen enterRoomFunc={getRoomId}/>}
        </>
    )
}