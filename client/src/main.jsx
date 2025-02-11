import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' 
import Hello from './hello.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Countdown />
  </React.StrictMode>,
)
