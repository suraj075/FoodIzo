import React,{ useContext, useState} from 'react'
import './ForgetPopup.css'
import{Link} from'react-router-dom'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ForgetPopup = ({setShowLogin}) => {


    const {url} = useContext(StoreContext);


    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(url+'/api/reset/requestPasswordReset',{email});
            if(response.data.success){
                toast.success(response.data.message);
            }else{
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("Error :", error);
        }
        
    }

  
    
    
  return (
    <div className="forget-password-container">
      <div className="forget-password-box">
        <h2>Reset Password</h2>
        <p className="instruction">Enter your email address and we'll send you instructions to reset your password.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          {message && <div className="message">{message}</div>}
          
          <button type="submit" className="reset-button">
            Send Reset Link
          </button>
        </form>
        
        <div onClick={()=>setShowLogin(true)} className="links">
          <Link to='/' >Back to Login</Link>
        </div>
      </div>
    </div>
  )
}

export default ForgetPopup
