import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import App from './App.jsx'
import "./index.css";
document.documentElement.classList.add("dark");

createRoot(document.getElementById('root')).render(
  <StrictMode >
    <AuthProvider>
      {/* <App/> */}
      <BrowserRouter>
      <App />
    </BrowserRouter>
    </AuthProvider>
    
  </StrictMode>
)
