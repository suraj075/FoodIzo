import React,{useState} from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes,Route } from 'react-router-dom'
import List from './components/pages/List/List'
import Order from './components/pages/Orders/Order'
import Add from './components/pages/Add/Add'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Login from './components/Login/Login'
import Verify from './components/Verify/Verify'
import ForgotPasswordEmail from './components/ForgotPasswordEmail/ForgotPasswordEmail'
import ForgotPasswordOTP from './components/ForgotPasswordOTP/ForgotPasswordOTP'
import ResetPassword from './components/ResetPassword/ResetPassword'


const App = () => {

  const url="https://foodizo-backend-eq3w.onrender.com";
  const[token,setToken] = useState(localStorage.getItem("token") || "");
  const [email,setEmail] = useState("");

  return (
    <div>
      <ToastContainer/>
      <Navbar token={token}/>
      <hr />
      <div className="app-component">
        <Sidebar/>
        <Routes>
          <Route path='/' element={<Login url={url} setToken={setToken} setEmail={setEmail} />}/>
          <Route path = "/add" element={<Add url={url} token={token} />}/>
          <Route path = "/list" element={<List url={url} token={token} />}/>
          <Route path = "/order" element={<Order url={url} token={token} />}/>
          <Route path='/verify' element={<Verify url={url} email={email} setToken={setToken} token={token}/>} />
          <Route path='/forgotpassword/email' element={<ForgotPasswordEmail url={url} />} />
          <Route path='/forgotpassword/otp' element={<ForgotPasswordOTP url={url} />}/>
          <Route path='/resetpassword' element={<ResetPassword url={url} />} />
          
        </Routes>
      </div>

    </div>
  )
}

export default App
