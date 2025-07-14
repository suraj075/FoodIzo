import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'

import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import MyOrder from './pages/MyOrder/MyOrder'
import ForgetPopup from './components/ForgetPopup/ForgetPopup'
import { ToastContainer } from 'react-toastify'
import ResetPassword from './components/ResetPassword/ResetPassword'


const App = () => {

  const [showLogin,setShowLogin] = useState(false);
  const [searchquery,setSearchquery] = useState("");
  const [recent1,setRecent1] = useState(false);
  const [recent2,setRecent2] = useState(false);


  return (
    <>
    <ToastContainer/>
    <Toaster
  position="top-right"
  reverseOrder={false}
  gutter={8}
  containerClassName="alert-container"
  containerStyle={{ marginTop: '2rem' }}
  toastOptions={{
    className: 'alert-container',
    duration: 2500,  // Set default toast duration to 4 seconds (4000ms)
    style: {
      background: '#000000',  // Black background
      color: '#ffffff',       // White text color
      borderRadius: '12px',   // Rounded corners
      padding: '20px',        // Padding around the text
      boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)', // Stronger shadow
      fontSize: '16px',       // Adjust font size
      transition: 'all 0.5s ease-in-out',  // Slow transition for the toast appearance
    },
    success: {
      duration: 1500,  // Success toast duration is still 3500ms
      style: {
        background: '#000000',   // Black background for success
        color: '#ffffff',        // White text color
        borderRadius: '12px',    // Rounded corners
        padding: '20px',         // Padding around the text
        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)', // Stronger shadow
        fontSize: '16px',        // Adjust font size
        transition: 'all 0.5s ease-in-out',  // Slow transition
      },
      theme: {
        primary: '#000000',      // Black color for primary theme
        secondary: '#ffffff',    // White color for secondary theme (if needed)
      },
    },
    error: {
      duration: 3500,  // Error toast duration is also set to 3500ms now (for consistency)
      style: {
        background: '#000000',   // Black background for error
        color: '#ffffff',        // White text color
        borderRadius: '12px',    // Rounded corners
        padding: '20px',         // Padding around the text
        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)', // Stronger shadow
        fontSize: '16px',        // Adjust font size
        transition: 'all 0.5s ease-in-out',  // Slow transition
      },
      theme: {
        primary: '#000000',      // Black color for primary theme
        secondary: '#ffffff',    // White color for secondary theme (if needed)
      },
    },
  }}
/>


    {showLogin?<LoginPopup setShowLogin={setShowLogin} />:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} searchquery={searchquery} recent1={recent1} recent2={recent2} setRecent1={setRecent1} setRecent2={setRecent2} setSearchquery={setSearchquery} />
        <Routes>
          <Route path='/' element={<Home searchquery={searchquery} recent1={recent1} recent2={recent2} setRecent1={setRecent1} setRecent2={setRecent2}/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/order' element={<PlaceOrder  setShowLogin={setShowLogin}/>}/> 
          <Route path='/verify' element={<Verify/>}/>
          <Route path='/myorders' element={<MyOrder/>}/>
          <Route path='/reset' element={<ForgetPopup setShowLogin={setShowLogin}/>}/>
          <Route path='/resetpassword/:token' element={<ResetPassword setShowLogin={setShowLogin} />}/>

          

        </Routes>

      </div>
      <Footer/>
      </>  

  )
}

export default App
