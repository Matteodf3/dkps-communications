import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import '@fontsource/ibm-plex-sans/latin-400.css'
import '@fontsource/ibm-plex-sans/latin-500.css'
import '@fontsource/ibm-plex-mono/latin-400.css'
import App from './App'
import { LocaleProvider } from './site/i18n'
import './styles.css'

const root = document.getElementById('root')!
const prefix = window.location.pathname.match(/^\/(en|it)(?:\/|$)/)?.[1]
const app = (
  <React.StrictMode>
    <BrowserRouter basename={prefix ? `/${prefix}` : undefined}><LocaleProvider><App /></LocaleProvider></BrowserRouter>
  </React.StrictMode>
)

if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
