import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'
import ProfileProvider from './context/ProfileProvider.jsx'
import SavedJobsProvider from './context/SavedJobsProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ProfileProvider>
        <SavedJobsProvider>
          <App />
        </SavedJobsProvider>
      </ProfileProvider>
    </BrowserRouter>
  </StrictMode>,
)
