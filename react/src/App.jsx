import { useState } from 'react'
import { PasswordProvider } from './context/PasswordContext'
import PasswordGenerator from './components/PasswordGenerator'
import './App.css'

function App() {
  return (
    <PasswordProvider>
      <div className="App">
        <PasswordGenerator />
      </div>
    </PasswordProvider> 
  )
}

export default App
