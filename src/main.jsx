import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { registerPWA } from './pwa'
import App from './App.jsx'

registerPWA()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
