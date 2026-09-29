import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/ibm-plex-sans/latin-400.css'
import '@fontsource/ibm-plex-sans/latin-500.css'
import '@fontsource/ibm-plex-mono/latin-400.css'
import PrototypeApp from './prototype-app'
import './hero-prototypes.css'
import './picker.css'

ReactDOM.createRoot(document.getElementById('prototype-root')!).render(
  <React.StrictMode><PrototypeApp /></React.StrictMode>,
)
