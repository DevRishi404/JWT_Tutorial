import { useState } from 'react'
import Login from './components/AuthPages/Login'
import './app.css'
import '@fontsource/roboto/500.css';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Login />
    </>
  )
}

export default App
