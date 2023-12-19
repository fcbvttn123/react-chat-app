import { PickRoomIdScreen } from "./PickRoomIdScreen"
import { RoomChatScreen } from "./RoomChatScreen"

import { useEffect, useState } from "react"

// Realtime DB
import { realtimeDb } from "../../firebase"
import {ref, onValue, set} from "firebase/database"

export function Room(props) {
    const [currentRoom, setCurrentRoom] = useState(null)
    const [existingRooms, setExistingRooms] = useState(null)
    
    let currentUser = props.username

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
      setCurrentRoom(roomId)
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