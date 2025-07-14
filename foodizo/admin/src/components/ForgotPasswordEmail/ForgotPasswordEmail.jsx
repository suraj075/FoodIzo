import React, {  useState } from 'react';
import './ForgotPasswordEmail.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPasswordEmail = ({ url }) => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
            const response = await axios.post(url+"/api/admin/reset/emailotp",{email:email});
            if(response.data.success){
                toast.success(response.data.message);
                navigate('/forgotpassword/otp',{state:{email:email}});
            }else{
                toast.error(response.data.message);
            }
       
    };

    return (
        <div className="forgot-password-container">
            <div className="logo-container">
                <img 
                    src={assets.logo} 
                    alt="Logo" 
                    className="logo" 
                    onClick={() => navigate('/')}
                />
            </div>
            <div className="forgot-password-box">
                <h1 className="title">Forgot Password?</h1>
                <p className="subtitle">Enter your email address to reset your password</p>

                <form onSubmit={handleSubmit} className="forgot-password-form">
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(event)=>setEmail(event.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">
                        Request OTP
                    </button>
                    <button 
                        type="button" 
                        className="back-btn"
                        onClick={() => navigate('/')}
                    >
                        Back to Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordEmail;