import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import { Qrcode } from './Qrcode'
import './Qrcode.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Qrcode />
  </StrictMode>,
)
