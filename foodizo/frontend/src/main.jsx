import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter}  from 'react-router-dom'
import StoreContextProvider from './context/StoreContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <StoreContextProvider>
 <App />
 </StoreContextProvider>
 </BrowserRouter>
  
)
  

// setting react Router
// 1st: remove strict mode
// 2nd: import brouser router
// 3rd: wrap app component with browser router