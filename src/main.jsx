import './utils/i18n.js'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CoinContextProvider from './CoinContext.jsx'
import i18n from './utils/i18n.js'
<link rel="stylesheet" href="./src/import.css" />
//import { ThemeProvider } from './ThemeContext';
//import './theme.css'
//npm run dev

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <CoinContextProvider>
        <App />
      </CoinContextProvider>
  </StrictMode>
  )  