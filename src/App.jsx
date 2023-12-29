import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { SignInScreen } from './components/signInScreen/SignInScreen'
import {Room} from "./components/roomScreen/Room"

function App() {
  const [currentLoggedInData, setCurrentLoggedInData] = useState(
    localStorage.getItem("react-chat-app-currentlyLoggedInEmail") && JSON.parse(localStorage.getItem("react-chat-app-currentlyLoggedInEmail"))
  )

  function getCurrentLoggedInData(userData) {
    setCurrentLoggedInData(userData)
  }

  return (
    <main className='main-screen'>
      {currentLoggedInData ? <Room username={currentLoggedInData.name} setCurrentLoggedInData={setCurrentLoggedInData}/> : <SignInScreen getUserName={getCurrentLoggedInData} />}
    </main>
  )
}

export default App
