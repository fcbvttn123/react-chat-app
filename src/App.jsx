import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { SignInScreen } from './components/signInScreen/SignInScreen'
import {Room} from "./components/roomScreen/Room"

// Realtime DB
import { realtimeDb } from './firebase'
import {ref, onValue, set} from "firebase/database"


function App() {
  const [currentScreen, setCurrentScreen] = useState("sign-in-screen")
  const [username, setUsername] = useState(null)

  function handleScreen(screen, username) {
    setCurrentScreen(screen)
    screen == "room-screen" && setUsername(username)
  }

  return (
    <main className='main-screen'>
      {currentScreen == "room-screen" ? <Room username={username}/> : <SignInScreen handleScreen={handleScreen} />}
    </main>
  )
}

export default App
