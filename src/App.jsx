import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { SignInScreen } from './components/signInScreen/SignInScreen'
import {Room} from "./components/roomScreen/Room"


function App() {
  const [currentScreen, setCurrentScreen] = useState("sign-in-screen")
  function handleScreen(screen) {
    setCurrentScreen(screen)
  }
  return (
    <main className='main-screen'>
      {currentScreen == "room-screen" ? <Room /> : <SignInScreen handleScreen={handleScreen} />}
    </main>
  )
}

export default App
