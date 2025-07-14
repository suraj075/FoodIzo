import React, { useContext,  useState } from 'react'
import './ResetPassword.css'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios'

const ResetPassword = ({setShowLogin}) => {

    const {token:urltoken} = useParams();

    const {url} = useContext(StoreContext);


  const [password, setPassword] = useState({
    newPassword: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setPassword(prev => ({
      ...prev,
      [name]: value
    }))
  }

  

  const handleSubmit = async (e) => {
    
    e.preventDefault()
    if (password.newPassword !== password.confirmPassword) {
        return toast.error("Password don't match!")
    }

    try {
       
        const response = await axios.post(url+"/api/reset/resetPassword",{token:urltoken,password:password.newPassword})
       
        if(response.data.success){
            toast.success(response.data.message);
            navigate("/");
            setShowLogin(true);
        }else{
            toast.error(response.data.message);
        }
        
    } catch (error) {
        console.log(error);
    }
        


  }

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <h2>Reset Password</h2>
        <p className="instruction">Please enter your new password</p>
        
        <form onSubmit={handleSubmit}>
          <div className="password-field">
            <label>New Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword.new ? "text" : "password"}
                name="newPassword"
                value={password.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                required
                minLength="6"
              />
              <span 
                className="toggle-password"
                onClick={() => togglePasswordVisibility('new')}
              >
                {showPassword.new ? '👁️' : '👁️‍🗨️'}
              </span>
            </div>
          </div>

          <div className="password-field">
            <label>Confirm Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword.confirm ? "text" : "password"}
                name="confirmPassword"
                value={password.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                required
                minLength="6"
              />
              <span 
                className="toggle-password"
                onClick={() => togglePasswordVisibility('confirm')}
              >
                {showPassword.confirm ? '👁️' : '👁️‍🗨️'}
              </span>
            </div>
          </div>

          <button type="submit" className="reset-button">
            Reset Password
          </button>
        </form>

        <div className="back-to-login">
        <span onClick={() => {navigate("/");
          setShowLogin(true)}}>Back to Login</span>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword