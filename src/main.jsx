import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import { XrplClientProvider } from './context/xrplClientContex.jsx'
import { WalletProvider } from './context/WalletContext.jsx'
import { WalletWidgetProvider } from './context/WalletWidgetContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <XrplClientProvider>
      <WalletProvider>
        <WalletWidgetProvider>
          <App />
        </WalletWidgetProvider>
      </WalletProvider>
    </XrplClientProvider>
  </StrictMode>,
)
